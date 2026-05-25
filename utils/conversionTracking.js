const DEFAULT_TIMEOUT = 2000;

export function createConversionEventId(prefix = "lead") {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackLeadConversion({
  event = "quote_form_submission",
  eventId,
  formName,
  formData = {},
  timeout = DEFAULT_TIMEOUT,
}) {
  if (typeof window === "undefined" || !window.dataLayer) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let resolved = false;
    const finish = (tracked) => {
      if (resolved) return;
      resolved = true;
      resolve(tracked);
    };

    window.dataLayer.push({
      event,
      eventId,
      formName,
      formData,
      eventTimeout: timeout,
      eventCallback: () => finish(true),
    });

    window.setTimeout(() => finish(false), timeout);
  });
}

export async function uploadGoogleAdsConversion({
  eventId,
  email,
  phone,
  gclid,
  gbraid,
  wbraid,
  conversionValue = 1,
  currencyCode = "NZD",
}) {
  const response = await fetch("/api/google-ads-conversion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId,
      email,
      phone,
      gclid,
      gbraid,
      wbraid,
      conversionValue,
      currencyCode,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    console.error("Google Ads server conversion failed", data);
  }

  return data;
}
