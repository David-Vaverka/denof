export default function ProductMenu({ items }: { items: string[] }) {
  return (
    <nav class="mb-3">
      <ul class="nav nav-pills flex-wrap">
        {items.map((item) => (
          <li class="nav-item" key={item}>
            <a href={`/${item}`} class="nav-link">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
