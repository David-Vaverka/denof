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
    <div class="card p-4">
      <h2 class="h3 mb-3">{product.title}</h2>
      <div class="mb-3">
        {product.priceRrp && (
          <span class="text-muted text-decoration-line-through me-2">
            {product.priceRrp.toFixed(2)} €
          </span>
        )}
        <span class="text-success fw-bold fs-4">
          {product.price.toFixed(2)} €
        </span>
      </div>
      {product.rank && (
        <div class="mb-3">
          {[...Array(Math.round(product.rank.rating))].map((_, i) => (
            <i key={i} class="bi-star-fill text-warning"></i>
          ))}
          <span class="ms-1 text-muted">
            {product.rank.rating} ({product.rank.count})
          </span>
        </div>
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
        <ul class="list-group list-group-flush mb-4">
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
          <i class="bi-bag-plus me-1"></i> Add to Cart
        </button>
        <span id="add-indicator" class="htmx-indicator small text-muted">
          Adding...
        </span>
      </form>
    </div>
  );
}
