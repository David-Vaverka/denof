import { Handlers, PageProps } from "$fresh/server.ts";
import NavBar from "../components/NavBar.tsx";
import ProductGallery from "../components/ProductGallery.tsx";
import ProductDetails from "../components/ProductDetails.tsx";
import ProductMenu from "../components/ProductMenu.tsx";
import Breadcrumbs from "../components/Breadcrumbs.tsx";

interface Parameter {
  title: string;
  value: string;
}

interface Crumb {
  title: string;
  url: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  priceRrp?: number;
  descriptionHtml: string;
  images: string[];
  menu: string[];
  breadcrumbs: Crumb[];
  rank?: { rating: number; count: number };
  coupon?: { code: string; description: string };
  parameters?: Parameter[];
}

interface Data {
  product: Product;
  cartCount: number;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const product: Product = JSON.parse(
      await Deno.readTextFile("./data/product.json"),
    );
    const cart = JSON.parse(await Deno.readTextFile("./data/cart.json"));
    return ctx.render({ product, cartCount: cart.items.length });
  },
};

export default function ProductPage({ data }: PageProps<Data>) {
  return (
    <div>
      <NavBar cartCount={data.cartCount} />
      <div class="max-w-4xl mx-auto p-4 space-y-4">
        <Breadcrumbs items={data.product.breadcrumbs} />
        <ProductMenu items={data.product.menu} />
        <div class="grid md:grid-cols-2 gap-4">
          <ProductGallery images={data.product.images} />
          <ProductDetails product={data.product} />
        </div>
      </div>
    </div>
  );
}
