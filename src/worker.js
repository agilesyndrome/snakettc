// Cloudflare Worker shell for the client-side TTC Streetcar Snake game.
// Static assets are bundled by Wrangler and served through the ASSETS binding.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Tiny endpoint that is useful for uptime checks after deployment.
    if (url.pathname === "/healthz") {
      return Response.json({ ok: true, app: "snakettc" });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    // Conservative browser hardening; the game needs no privileged device APIs.
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
