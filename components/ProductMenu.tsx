export default function ProductMenu({ items }: { items: string[] }) {
  return (
    <nav class="mb-3">
      <ul class="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href={`/${item}`}
              class="px-3 py-1 rounded bg-gray-100 text-sm"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
