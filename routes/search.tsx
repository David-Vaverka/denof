import { Handlers, PageProps } from "$fresh/server.ts";
import SearchBox from "../islands/SearchBox.tsx";

interface Product {
  id: string;
  title: string;
}

export const handler: Handlers<Product[]> = {
  async GET(_req, ctx) {
    console.log("loading search data");
    const products: Product[] = JSON.parse(
      await Deno.readTextFile("./data/products.json"),
    );
    return ctx.render(products);
  },
};

export default function SearchSnippet({ data }: PageProps<Product[]>) {
  return (
    <div class="fixed inset-0 bg-white p-4">
      <SearchBox products={data} />
    </div>
  );
}
