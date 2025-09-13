import { useEffect } from "preact/hooks";

interface MenuItem {
  title: string;
  href: string;
}

export default function Menu({ items }: { items: MenuItem[] }) {
  useEffect(() => {
    console.log("Menu island loaded");
  }, []);

  const close = () => {
    const container = document.getElementById("menu-root");
    if (container) container.innerHTML = "";
  };

  return (
    <div class="fixed inset-0 bg-white z-50 p-4" id="menu-overlay">
      <button
        class="mb-4 text-xl"
        onClick={close}
        aria-label="Close menu"
      >
        ×
      </button>
      <ul class="space-y-2">
        {items.map((item) => (
          <li>
            <a href={item.href} class="block py-2 text-lg">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
