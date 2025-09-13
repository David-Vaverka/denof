import { useEffect, useState } from "preact/hooks";

interface MenuItem {
  title: string;
  href?: string;
  icon?: string;
  children?: MenuItem[];
}

export default function Menu({ items }: { items: MenuItem[] }) {
  useEffect(() => {
    console.log("Menu island loaded");
  }, []);

  const [open, setOpen] = useState<number | null>(
    () => items.findIndex((i) => i.children) ?? null,
  );

  const close = () => {
    const container = document.getElementById("menu-root");
    if (container) container.innerHTML = "";
  };

  return (
    <div class="fixed inset-0 z-50 flex" id="menu-overlay">
      <div class="flex-1 bg-black/50" onClick={close} />
      <div class="w-72 bg-white p-4 overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <span class="font-bold">Menu</span>
          <button
            class="text-xl"
            onClick={close}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <ul class="space-y-1">
          {items.map((item, idx) => (
            <li key={item.title}>
              <button
                class="w-full flex items-center justify-between py-2 px-2 rounded hover:bg-gray-100"
                onClick={() =>
                  item.children
                    ? setOpen(open === idx ? null : idx)
                    : close()}
              >
                <span class="flex items-center gap-2">
                  {item.icon && <span class="text-xl">{item.icon}</span>}
                  {item.title}
                </span>
                {item.children && (
                  <span class="text-gray-500">{open === idx ? "−" : ">"}</span>
                )}
              </button>
              {item.children && open === idx && (
                <ul class="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.title}>
                      <a
                        href={child.href}
                        class="block py-1 text-sm text-gray-600 hover:underline"
                        onClick={close}
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
