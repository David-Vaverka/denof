import { Handlers, PageProps } from "$fresh/server.ts";
import NavBar from "../../components/NavBar.tsx";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface Data {
  title: string;
  products: Product[];
  cartCount: number;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { name } = ctx.params;
    console.log("loading category", name);
    const file = await Deno.readTextFile(`./data/category-${name}.json`);
    const category = JSON.parse(file) as { title: string; products: Product[] };
    const cart = JSON.parse(await Deno.readTextFile("./data/cart.json"));
    return ctx.render({ ...category, cartCount: cart.items.length });
  },
};

export default function CategoryPage({ data }: PageProps<Data>) {
  return (
    <div>
      <NavBar cartCount={data.cartCount} />
      <h1 class="text-xl font-bold p-4">{data.title}</h1>
      <ul class="p-4 space-y-4">
        {data.products.map((p) => (
          <li key={p.id} class="flex gap-4">
            <img src={p.image} alt={p.title} class="w-24 h-24 rounded object-cover" />
            <div>
              <a href={p.id === "45544593" ? "/product" : "#"} class="block font-medium">
                {p.title}
              </a>
              <span class="text-green-600">{p.price.toFixed(2)} €</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
