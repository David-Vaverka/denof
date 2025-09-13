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
      <ul>
        {data.products.length
          ? data.products.map((p) => (
            <li key={p.id} class="py-1">
              <a href={`/product?id=${p.id}`} class="block">
                {p.title}
              </a>
            </li>
          ))
          : <li>No results</li>}
      </ul>
    );
  }
  return (
    <div class="fixed inset-0 bg-white p-4">
      <input
        type="text"
        name="q"
        placeholder="Search..."
        class="w-full p-2 border"
        hx-get="/search"
        hx-trigger="input changed delay:500ms"
        hx-target="#search-results"
        hx-swap="innerHTML"
        autofocus
      />
      <div id="search-results" class="mt-4" />
    </div>
  );
}
