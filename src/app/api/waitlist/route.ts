const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { email } = await request.json();

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("Missing KIT_API_KEY or KIT_FORM_ID environment variables.");
    return Response.json(
      { error: "Waitlist is not configured yet." },
      { status: 500 },
    );
  }

  const response = await fetch(
    `https://api.kit.com/v4/forms/${formId}/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({ email_address: email }),
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    console.error("Kit subscribe failed:", response.status, body);
    return Response.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
