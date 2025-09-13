import { Partial } from "$fresh/runtime.ts";
import Menu from "../../islands/Menu.tsx";

const items = [
  { title: "Gospodinjski aparati", href: "#", icon: "🍳" },
  { title: "Računalništvo, telefonija", href: "#", icon: "💻" },
  { title: "Avdio-video in foto", href: "#", icon: "🎥" },
  {
    title: "Oprema doma",
    icon: "🏠",
    children: [
      { title: "Vsa ponudba", href: "#" },
      { title: "Živila", href: "#" },
      { title: "Jedilnica", href: "#" },
    ],
  },
];

export default function MenuPartial() {
  console.log("loading menu partial");
  return (
    <Partial name="menu" id="menu-root">
      <Menu items={items} />
    </Partial>
  );
}
