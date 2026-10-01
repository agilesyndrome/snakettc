// Cloudflare Worker shell for TTC Streetcar Snake.
// Static assets bypass Worker execution; only explicit app endpoints run here.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/healthz") {
      return Response.json(
        { ok: true, app: "snakettc" },
        {
          headers: {
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
          },
        },
      );
    }

    // Defensive fallback for any future Worker-first route.
    return env.ASSETS.fetch(request);
  },
};
