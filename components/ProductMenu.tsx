export default function ProductMenu({ items }: { items: string[] }) {
  return (
    <nav class="mb-4">
      <ul class="flex flex-wrap gap-2 text-sm text-gray-600">
        {items.map((item) => (
          <li key={item}>
            <a href={`/${item}`} class="hover:underline">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
