export default function CartSummary({ count }: { count: number }) {
  return (
    <span id="cart-count" class="badge bg-secondary">
      Cart ({count})
    </span>
  );
}
