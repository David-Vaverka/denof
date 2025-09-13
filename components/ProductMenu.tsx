export default function ProductMenu({ items }: { items: string[] }) {
  return (
    <nav class="mb-3">
      <ul class="list-unstyled d-flex flex-wrap gap-2 mb-0">
        {items.map((item) => (
          <li key={item}>
            <a
              href={`/${item}`}
              class="badge bg-light text-dark text-decoration-none p-2"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
