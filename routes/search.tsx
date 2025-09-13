import { Handlers, PageProps } from "$fresh/server.ts";
import NavBar from "../components/NavBar.tsx";

interface Product {
  id: string;
  title: string;
}

interface Data {
  query: string;
  results: Product[];
  cartCount: number;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") ?? "";
    const product = JSON.parse(await Deno.readTextFile("./data/product.json"));
    const cart = JSON.parse(await Deno.readTextFile("./data/cart.json"));
    const match = product.title.toLowerCase().includes(q.toLowerCase()) ? [product] : [];
    return ctx.render({ query: q, results: match, cartCount: cart.items.length });
  },
};

export default function SearchPage({ data }: PageProps<Data>) {
  return (
    <div>
      <NavBar cartCount={data.cartCount} />
      <div class="container py-4">
        <h1 class="h5">Results for "{data.query}"</h1>
        {data.results.length > 0 ? (
          <ul class="list-group">
            {data.results.map((p) => (
              <li key={p.id} class="list-group-item">
                <a href="/product">{p.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
}
