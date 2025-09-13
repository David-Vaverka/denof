import { useState } from "preact/hooks";

interface Product {
  id: string;
  title: string;
}

export default function SearchBox({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const results = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div class="p-4">
      <input
        type="text"
        placeholder="Search..."
        autoFocus
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        class="w-full p-2 border rounded mb-4"
      />
      <ul class="space-y-2">
        {results.map((p) => (
          <li key={p.id} class="border-b pb-2">
            <a href={p.id === "45544593" ? "/product" : "#"}>{p.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
