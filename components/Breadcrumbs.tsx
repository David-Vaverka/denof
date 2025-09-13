interface Crumb {
  title: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav class="mb-3" aria-label="breadcrumb">
      <ol class="breadcrumb">
        {items.map((c) => (
          <li class="breadcrumb-item" key={c.url}>
            <a href={`/${c.url}`}>{c.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
