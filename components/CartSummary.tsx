export default function CartSummary({ count }: { count: number }) {
  return <span id="cart-count">Cart ({count})</span>;
}
