// Cloudflare Worker entry point.
// Static files usually bypass this file; only Worker-first routes arrive here.

const HEALTH_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function healthResponse() {
  // Keep the health check small and dependency-free for monitors.
  return Response.json(
    { ok: true, app: "snakettc" },
    { headers: HEALTH_HEADERS },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/healthz") {
      return healthResponse();
    }

    // Defensive fallback for any future Worker-first route.
    return env.ASSETS.fetch(request);
  },
};
