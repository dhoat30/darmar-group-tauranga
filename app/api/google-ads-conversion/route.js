import { NextResponse } from "next/server";
import crypto from "crypto";

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || "v20";
const GOOGLE_ADS_TIMEZONE =
  process.env.GOOGLE_ADS_CONVERSION_TIMEZONE || "Pacific/Auckland";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function cleanCustomerId(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizePhone(phone) {
  const raw = String(phone || "").trim();
  if (!raw) return "";
  if (raw.startsWith("+")) return `+${raw.replace(/\D/g, "")}`;

  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("64")) return `+${digits}`;
  if (digits.startsWith("0")) return `+64${digits.slice(1)}`;
  return `+${digits}`;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function buildUserIdentifiers({ email, phone }) {
  const identifiers = [];
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);

  if (normalizedEmail) {
    identifiers.push({ hashedEmail: sha256(normalizedEmail) });
  }

  if (normalizedPhone) {
    identifiers.push({ hashedPhoneNumber: sha256(normalizedPhone) });
  }

  return identifiers;
}

function getTimeZoneOffset(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  return Math.round((asUtc - date.getTime()) / 60000);
}

function formatGoogleAdsDateTime(dateInput, timeZone = GOOGLE_ADS_TIMEZONE) {
  const date = dateInput ? new Date(dateInput) : new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const offsetMinutes = getTimeZoneOffset(date, timeZone);
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, "0");
  const offsetMins = String(absOffset % 60).padStart(2, "0");

  return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}:${values.second}${sign}${offsetHours}:${offsetMins}`;
}

async function getAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: requireEnv("GOOGLE_ADS_CLIENT_ID"),
      client_secret: requireEnv("GOOGLE_ADS_CLIENT_SECRET"),
      refresh_token: requireEnv("GOOGLE_ADS_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Google OAuth token request failed: ${data.error || response.status}`
    );
  }

  return data.access_token;
}

function getClientIp(req) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "";
}

function buildClickConversion(payload) {
  const customerId = cleanCustomerId(requireEnv("GOOGLE_ADS_CUSTOMER_ID"));
  const conversionActionId = cleanCustomerId(
    requireEnv("GOOGLE_ADS_CONVERSION_ACTION_ID")
  );
  const userIdentifiers = buildUserIdentifiers(payload);
  const conversion = {
    conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
    conversionDateTime: formatGoogleAdsDateTime(payload.conversionDateTime),
    conversionValue: Number(payload.conversionValue ?? 1),
    currencyCode: payload.currencyCode || "NZD",
    userIdentifiers,
    consent: {
      adUserData: "GRANTED",
    },
  };

  if (payload.orderId || payload.eventId) {
    conversion.orderId = String(payload.orderId || payload.eventId);
  }

  if (payload.gclid) conversion.gclid = payload.gclid;
  if (payload.gbraid) conversion.gbraid = payload.gbraid;
  if (payload.wbraid) conversion.wbraid = payload.wbraid;

  return conversion;
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const data = payload.data || payload.conversion || payload;
    const customerId = cleanCustomerId(requireEnv("GOOGLE_ADS_CUSTOMER_ID"));
    const loginCustomerId = cleanCustomerId(
      process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
    );
    const conversion = buildClickConversion(data);

    if (
      !conversion.gclid &&
      !conversion.gbraid &&
      !conversion.wbraid &&
      conversion.userIdentifiers.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing attribution data. Send at least one click ID or email/phone.",
        },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": requireEnv("GOOGLE_ADS_DEVELOPER_TOKEN"),
      "Content-Type": "application/json",
    };

    if (loginCustomerId) {
      headers["login-customer-id"] = loginCustomerId;
    }

    const response = await fetch(
      `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${customerId}:uploadClickConversions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          conversions: [conversion],
          partialFailure: true,
          validateOnly: Boolean(data.validateOnly),
          debugEnabled: false,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.partialFailureError) {
      console.error("Google Ads conversion upload issue", {
        status: response.status,
        result,
      });
    }

    return NextResponse.json(
      {
        success: response.ok && !result.partialFailureError,
        message:
          response.ok && !result.partialFailureError
            ? "Google Ads conversion uploaded"
            : "Google Ads conversion upload returned an error",
        data: result,
        request: {
          customerId,
          conversionAction: conversion.conversionAction,
          conversionDateTime: conversion.conversionDateTime,
          hasGclid: Boolean(conversion.gclid),
          hasGbraid: Boolean(conversion.gbraid),
          hasWbraid: Boolean(conversion.wbraid),
          userIdentifierCount: conversion.userIdentifiers.length,
          clientIp: getClientIp(req),
        },
      },
      { status: response.ok ? 200 : response.status }
    );
  } catch (error) {
    console.error("Google Ads conversion route error", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
