const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_VERSION = "2025-04";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

  if (!storeDomain || !adminToken) {
    console.error("Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_ACCESS_TOKEN.");
    return Response.json(
      { error: "Waitlist is not configured yet." },
      { status: 500 },
    );
  }

  const baseUrl = `https://${storeDomain}/admin/api/${API_VERSION}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": adminToken,
  };

  // Attempt to create the customer with email marketing consent.
  const createRes = await fetch(`${baseUrl}/customers.json`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      customer: {
        email,
        email_marketing_consent: {
          state: "subscribed",
          opt_in_level: "single_opt_in",
        },
      },
    }),
  });

  if (createRes.ok) {
    return Response.json({ ok: true });
  }

  const createBody = await createRes.json().catch(() => null);

  // 422 with "has already been taken" means the customer exists — update them instead.
  const emailTaken =
    createRes.status === 422 &&
    createBody?.errors?.email?.some((msg: string) =>
      msg.includes("has already been taken"),
    );

  if (!emailTaken) {
    console.error("Shopify create customer failed:", createRes.status, createBody);
    return Response.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 502 },
    );
  }

  // Find the existing customer by email.
  const searchRes = await fetch(
    `${baseUrl}/customers.json?email=${encodeURIComponent(email)}&fields=id`,
    { headers },
  );

  if (!searchRes.ok) {
    console.error("Shopify customer search failed:", searchRes.status);
    return Response.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 502 },
    );
  }

  const searchBody = await searchRes.json();
  const customerId: number | undefined = searchBody.customers?.[0]?.id;

  // Already subscribed — treat as success.
  if (!customerId) {
    return Response.json({ ok: true });
  }

  // Update their marketing consent.
  const updateRes = await fetch(`${baseUrl}/customers/${customerId}.json`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      customer: {
        id: customerId,
        email_marketing_consent: {
          state: "subscribed",
          opt_in_level: "single_opt_in",
        },
      },
    }),
  });

  if (!updateRes.ok) {
    const updateBody = await updateRes.json().catch(() => null);
    console.error("Shopify update customer failed:", updateRes.status, updateBody);
    return Response.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
