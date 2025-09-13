interface Crumb {
  title: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav class="text-sm text-gray-500 mb-4">
      <ol class="flex flex-wrap gap-1">
        {items.map((c, i) => (
          <li key={c.url} class="flex items-center gap-1">
            {i > 0 && <span>/</span>}
            <a href={`/${c.url}`} class="hover:underline">{c.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
