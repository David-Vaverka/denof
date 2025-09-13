import CartSummary from "./CartSummary.tsx";

export default function NavBar({ cartCount }: { cartCount: number }) {
  return (
    <nav class="flex items-center justify-between p-4 border-b">
      <a href="/product" class="font-bold text-lg">Narwal Store</a>
      <div class="flex items-center gap-4">
        <a href="/search" aria-label="Search" class="text-xl">
          🔍
        </a>
        <CartSummary count={cartCount} />
      </div>
    </nav>
  );
}
