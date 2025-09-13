import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const src = url.searchParams.get("src") ?? "";
    const body = `<img id="main-image" src="${src}" alt="main" class="img-fluid rounded mb-2" />`;
    return new Response(body, {
      headers: { "Content-Type": "text/html" },
    });
  },
};
