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
    <div class="p-4 bg-white rounded shadow">
      <h2 class="text-xl mb-3 font-semibold">{product.title}</h2>
      <div class="mb-3">
        {product.priceRrp && (
          <span class="text-gray-500 line-through mr-2">
            {product.priceRrp.toFixed(2)} €
          </span>
        )}
        <span class="text-green-600 font-bold text-2xl">
          {product.price.toFixed(2)} €
        </span>
        {product.priceRrp && (
          <span class="text-red-500 ml-2">
            -
            {Math.round(100 - (product.price / product.priceRrp) * 100)}%
          </span>
        )}
      </div>
      {product.rank && (
        <div class="mb-3 text-yellow-500">
          {[...Array(Math.round(product.rank.rating))].map((_, i) => (
            <span key={i}>★</span>
          ))}
          <span class="ml-1 text-gray-600">
            {product.rank.rating} ({product.rank.count})
          </span>
        </div>
      )}
      {product.coupon && (
        <div class="bg-yellow-100 p-2 rounded mb-3 text-sm">
          Use code <strong>{product.coupon.code}</strong> – {product.coupon.description}
        </div>
      )}
      <div
        class="mb-3 text-sm"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      />
      {product.parameters && (
        <ul class="mb-4 text-sm">
          {product.parameters.map((p) => (
            <li
              key={p.title}
              class="flex justify-between py-1 border-b last:border-b-0"
            >
              <span class="font-medium">{p.title}</span>
              <span>{p.value}</span>
            </li>
          ))}
        </ul>
      )}
      <form
        hx-post="/cart"
        hx-target="#cart-count"
        hx-swap="outerHTML"
        hx-indicator="#add-indicator"
        class="flex items-center gap-2"
      >
        <input type="hidden" name="id" value={product.id} />
        <button
          id="add-button"
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add to Cart
        </button>
        <span id="add-indicator" class="htmx-indicator text-sm text-gray-500">
          Adding...
        </span>
      </form>
    </div>
  );
}
