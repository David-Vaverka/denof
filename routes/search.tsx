import { Handlers, PageProps } from "$fresh/server.ts";

interface Product {
  id: string;
  title: string;
}

interface Data {
  products: Product[];
  q: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") ?? "";
    const products: Product[] = JSON.parse(
      await Deno.readTextFile("./data/products.json"),
    );
    console.log("search", q);
    const matches = q
      ? products.filter((p) =>
          p.title.toLowerCase().includes(q.toLowerCase())
        ).slice(0, 5)
      : [];
    return ctx.render({ products: matches, q });
  },
};

export default function Search({ data }: PageProps<Data>) {
  if (data.q) {
    return (
      <ul class="list-group">
        {data.products.length
          ? data.products.map((p) => (
            <li key={p.id} class="list-group-item">
              <a href={`/product?id=${p.id}`}>{p.title}</a>
            </li>
          ))
          : <li class="list-group-item">No results</li>}
      </ul>
    );
  }
  return (
    <div class="position-fixed top-0 start-0 w-100 h-100 bg-white p-4">
      <input
        type="text"
        name="q"
        placeholder="Search..."
        class="form-control"
        hx-get="/search"
        hx-trigger="input changed delay:500ms"
        hx-target="#search-results"
        hx-swap="innerHTML"
        hx-push-url="true"
        autofocus
      />
      <div id="search-results" class="mt-4" />
    </div>
  );
}
