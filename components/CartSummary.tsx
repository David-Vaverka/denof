export default function CartSummary({ count }: { count: number }) {
  return (
    <span id="cart-count" class="badge bg-primary d-flex align-items-center gap-1">
      <i class="bi-cart-fill"></i>
      <span>{count}</span>
    </span>
  );
}
