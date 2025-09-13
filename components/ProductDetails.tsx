interface Parameter {
  title: string;
  value: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  priceRrp?: number;
  descriptionHtml: string;
  rank?: { rating: number; count: number };
  coupon?: { code: string; description: string };
  parameters?: Parameter[];
}

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div class="space-y-4 p-4 border rounded shadow">
      <h1 class="text-2xl font-bold">{product.title}</h1>
      <div class="flex items-baseline gap-2">
        {product.priceRrp && (
          <span class="text-gray-500 line-through">{product.priceRrp.toFixed(2)} €</span>
        )}
        <span class="text-xl text-green-600">{product.price.toFixed(2)} €</span>
      </div>
      {product.rank && (
        <p class="text-sm text-yellow-600">⭐ {product.rank.rating} ({product.rank.count})</p>
      )}
      {product.coupon && (
        <p class="text-sm bg-yellow-100 p-2 rounded">
          Use code <strong>{product.coupon.code}</strong> – {product.coupon.description}
        </p>
      )}
      <div
        class="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      />
      {product.parameters && (
        <ul class="list-disc pl-5 text-sm space-y-1">
          {product.parameters.map((p) => (
            <li key={p.title}>
              <span class="font-medium">{p.title}:</span> {p.value}
            </li>
          ))}
        </ul>
      )}
      <form
        hx-post="/cart"
        hx-target="#cart-count"
        hx-swap="outerHTML"
        hx-indicator="#add-indicator"
        class="mt-4 flex items-center gap-2"
      >
        <input type="hidden" name="id" value={product.id} />
        <button
          id="add-button"
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add to Cart
        </button>
        <span
          id="add-indicator"
          class="htmx-indicator text-sm text-gray-500"
        >
          Adding...
        </span>
      </form>
    </div>
  );
}
