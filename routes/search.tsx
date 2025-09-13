import { Handlers, PageProps } from "$fresh/server.ts";
import NavBar from "../components/NavBar.tsx";
import SearchBox from "../islands/SearchBox.tsx";

interface Product {
  id: string;
  title: string;
}

interface Data {
  products: Product[];
  cartCount: number;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    console.log("loading search data");
    const products: Product[] = JSON.parse(
      await Deno.readTextFile("./data/products.json"),
    );
    const cart = JSON.parse(await Deno.readTextFile("./data/cart.json"));
    return ctx.render({ products, cartCount: cart.items.length });
  },
};

export default function SearchPage({ data }: PageProps<Data>) {
  return (
    <div>
      <NavBar cartCount={data.cartCount} />
      <SearchBox products={data.products} />
    </div>
  );
}
