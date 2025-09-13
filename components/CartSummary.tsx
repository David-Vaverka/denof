export default function CartSummary({ count }: { count: number }) {
  return (
    <span id="cart-count" class="text-lg" aria-label="Cart">
      🛒 {count}
    </span>
  );
}
