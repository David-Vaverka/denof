import { Partial } from "$fresh/runtime.ts";
import Menu from "../../islands/Menu.tsx";

const items = [
  { title: "Home", href: "/" },
  { title: "Product", href: "/product" },
  { title: "Cart", href: "/cart" },
];

export default function MenuPartial() {
  return (
    <Partial name="menu">
      <Menu items={items} />
    </Partial>
  );
}
