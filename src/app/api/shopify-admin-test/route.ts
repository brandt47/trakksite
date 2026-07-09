import { adminGraphql, getAdminAccessToken } from "@/lib/shopify-admin";

// TEMPORARY debug route to verify the Admin API client-credentials flow.
// Hit http://localhost:3000/api/shopify-admin-test then delete this file.
export async function GET() {
  try {
    const token = await getAdminAccessToken();
    const tokenPreview = token
      ? `${token.slice(0, 8)}…(${token.length} chars)`
      : null;

    const data = await adminGraphql<{
      shop: { name: string; myshopifyDomain: string };
    }>(`{
      shop { name myshopifyDomain }
    }`);

    return Response.json({
      ok: true,
      tokenPreview,
      shop: data.shop,
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
