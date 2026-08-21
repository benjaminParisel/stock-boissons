export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return env.ASSETS.fetch(request);
    }
    const res = await env.ASSETS.fetch(request);
    const html = await res.text();
    const replaced = html.replace("__APPS_SCRIPT_URL__", env.APPS_SCRIPT_URL || "");
    return new Response(replaced, res);
  },
};
