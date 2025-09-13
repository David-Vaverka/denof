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
    <div class="card p-3">
      <h1 class="h4">{product.title}</h1>
      <div class="mb-2">
        {product.priceRrp && (
          <span class="text-muted text-decoration-line-through me-2">
            {product.priceRrp.toFixed(2)} €
          </span>
        )}
        <span class="text-success fw-bold">{product.price.toFixed(2)} €</span>
      </div>
      {product.rank && (
        <p class="small text-warning">
          ⭐ {product.rank.rating} ({product.rank.count})
        </p>
      )}
      {product.coupon && (
        <div class="alert alert-warning py-2">
          Use code <strong>{product.coupon.code}</strong> – {product.coupon.description}
        </div>
      )}
      <div
        class="mb-3"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      />
      {product.parameters && (
        <ul class="list-group list-group-flush mb-3">
          {product.parameters.map((p) => (
            <li
              key={p.title}
              class="list-group-item d-flex justify-content-between"
            >
              <span class="fw-medium">{p.title}</span>
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
        class="d-flex align-items-center gap-2"
      >
        <input type="hidden" name="id" value={product.id} />
        <button id="add-button" type="submit" class="btn btn-primary">
          Add to Cart
        </button>
        <span id="add-indicator" class="htmx-indicator small text-muted">
          Adding...
        </span>
      </form>
    </div>
  );
}
