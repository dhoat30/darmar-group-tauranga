
import { NextResponse } from 'next/server'

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const EMAIL_TO = process.env.EMAIL_TO;
const EMAIL_FROM = process.env.MAILGUN_FROM_EMAIL || `Darmar Group <website@${DOMAIN}>`;

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(String(value || "").trim());

export async function GET(req, res) {
  const response = await res.json();

  return NextResponse.json(response)
}

export async function POST(req, res) {
  const { email, message, formName } = await req.json();

  if (!DOMAIN || !API_KEY || !EMAIL_TO) {
    return NextResponse.json(
      { message: "Mailgun is not configured", success: false },
      { status: 500 }
    );
  }

  // Mailgun API endpoint
  const url = `https://api.mailgun.net/v3/${DOMAIN}/messages`;
  // Prepare the form data as URL encoded
  const formData = new URLSearchParams();
  formData.append('from', EMAIL_FROM);
  formData.append('to', EMAIL_TO );
  formData.append('subject', formName || "New website form submission");
  formData.append('text', `${message}`);
  if (isValidEmail(email)) {
    formData.append('h:Reply-To', email);
  }


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      return NextResponse.json({ message: "Failed", success: false, data: data }, {status: response.status});

    }

    // Use NextApiResponse type for auto-completion and proper response typing

    return NextResponse.json({ message: "This Worked", success: true, data: data },{ status: 200});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to send email", success: false }, {status: 400});
  }
};
