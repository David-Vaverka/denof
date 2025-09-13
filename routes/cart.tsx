import { Handlers } from "$fresh/server.ts";
import CartSummary from "../components/CartSummary.tsx";
import { renderToString } from "preact-render-to-string";
import { h } from "preact";

interface Cart {
  items: string[];
}

async function readCart(): Promise<Cart> {
  try {
    return JSON.parse(await Deno.readTextFile("./data/cart.json"));
  } catch {
    return { items: [] };
  }
}

async function writeCart(cart: Cart) {
  await Deno.writeTextFile("./data/cart.json", JSON.stringify(cart, null, 2));
}

export const handler: Handlers = {
  async GET() {
    const cart = await readCart();
    const body = renderToString(<CartSummary count={cart.items.length} />);
    return new Response(body, { headers: { "Content-Type": "text/html" } });
  },
  async POST(req) {
    const form = await req.formData();
    const id = form.get("id")?.toString();
    const cart = await readCart();
    if (id) cart.items.push(id);
    await writeCart(cart);
    const body = renderToString(
      <>
        <CartSummary count={cart.items.length} />
        <button
          id="add-button"
          hx-swap-oob="outerHTML"
          class="px-4 py-2 bg-green-600 text-white rounded"
        >
          Added
        </button>
      </>,
    );
    return new Response(body, { headers: { "Content-Type": "text/html" } });
  },
};
