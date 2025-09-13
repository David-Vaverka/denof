import { Handlers, PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import CartSummary from "../components/CartSummary.tsx";

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

export const handler: Handlers<Cart> = {
  async GET(_req, ctx) {
    const cart = await readCart();
    return ctx.render(cart);
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const id = form.get("id")?.toString();
    const cart = await readCart();
    if (id) cart.items.push(id);
    await writeCart(cart);
    return ctx.render(cart);
  },
};

export default function CartRoute({ data }: PageProps<Cart>) {
  return (
    <Partial name="cart">
      <CartSummary count={data.items.length} />
    </Partial>
  );
}
