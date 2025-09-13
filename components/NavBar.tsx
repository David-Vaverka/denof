import CartSummary from "./CartSummary.tsx";

export default function NavBar({ cartCount }: { cartCount: number }) {
  return (
    <>
      <nav class="flex items-center justify-between p-4 border-b">
        <a href="/product" class="font-bold text-lg">Narwal Store</a>
        <div class="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            class="text-xl"
            hx-get="/search"
            hx-target="#search-box"
            hx-swap="innerHTML"
          >
            🔍
          </button>
          <CartSummary count={cartCount} />
        </div>
      </nav>
      <div id="search-box"></div>
    </>
  );
}
