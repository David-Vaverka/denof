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
      <h1 class="h5 fw-bold p-3">{data.title}</h1>
      <ul class="list-unstyled p-3">
        {data.products.map((p) => (
          <li key={p.id} class="d-flex gap-3 mb-3">
            <img
              src={p.image}
              alt={p.title}
              class="rounded"
              width="96"
              height="96"
            />
            <div>
              <a
                href={p.id === "45544593" ? "/product" : "#"}
                class="fw-medium d-block"
              >
                {p.title}
              </a>
              <span class="text-success">{p.price.toFixed(2)} €</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
