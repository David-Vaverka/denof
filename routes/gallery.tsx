import { Handlers } from "$fresh/server.ts";
import { h } from "preact";
import { renderToString } from "preact-render-to-string";
import ProductGallery from "../components/ProductGallery.tsx";

const { images } = JSON.parse(
  await Deno.readTextFile("./data/product.json"),
) as { images: string[] };

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const index = Number(url.searchParams.get("index") ?? "0");
    const body = renderToString(
      <ProductGallery images={images} index={index} />,
    );
    return new Response(body, { headers: { "Content-Type": "text/html" } });
  },
  async POST(req) {
    const form = await req.formData();
    const index = Number(form.get("index") ?? "0");
    const dir = form.get("dir")?.toString() ?? "next";
    let nextIndex = index;
    if (dir === "next") nextIndex = (index + 1) % images.length;
    else nextIndex = (index - 1 + images.length) % images.length;
    const body = renderToString(
      <ProductGallery images={images} index={nextIndex} />,
    );
    return new Response(body, { headers: { "Content-Type": "text/html" } });
  },
};

