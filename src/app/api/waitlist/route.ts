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

  const headers = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  // Kit's "add subscriber to form" endpoint 404s unless the subscriber
  // already exists, so create them first, then attach them to the form.
  const createResponse = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email }),
  });

  if (!createResponse.ok) {
    const body = await createResponse.json().catch(() => null);
    console.error("Kit create subscriber failed:", createResponse.status, body);
    return Response.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 502 },
    );
  }

  const formResponse = await fetch(
    `https://api.kit.com/v4/forms/${formId}/subscribers`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ email_address: email }),
    },
  );

  if (!formResponse.ok) {
    const body = await formResponse.json().catch(() => null);
    console.error("Kit add to form failed:", formResponse.status, body);
    return Response.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
