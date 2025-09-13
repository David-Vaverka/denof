interface Crumb {
  title: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav class="mb-3 text-sm" aria-label="breadcrumb">
      <ol class="flex gap-2">
        {items.map((c, i) => (
          <li key={c.url} class="flex items-center">
            <a href={`/${c.url}`}>{c.title}</a>
            {i < items.length - 1 && <span class="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
