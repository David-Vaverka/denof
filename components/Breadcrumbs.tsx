interface Crumb {
  title: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav class="mb-3 small" aria-label="breadcrumb">
      <ol class="breadcrumb mb-0">
        {items.map((c) => (
          <li key={c.url} class="breadcrumb-item">
            <a href={`/${c.url}`}>{c.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
