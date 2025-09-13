import CartSummary from "./CartSummary.tsx";

export default function NavBar({ cartCount }: { cartCount: number }) {
  return (
    <>
      <nav class="navbar bg-light px-3 mb-3">
        <a href="/product" class="navbar-brand">Narwal Store</a>
        <div class="d-flex align-items-center gap-3">
          <button
            type="button"
            aria-label="Menu"
            class="btn btn-link fs-4 text-decoration-none"
            hx-get="/partials/menu"
            hx-target="#menu-root"
            hx-swap="outerHTML"
          >
            ☰
          </button>
          <button
            type="button"
            aria-label="Search"
            class="btn btn-link fs-4 text-decoration-none"
            hx-get="/search"
            hx-target="#search-box"
            hx-swap="innerHTML"
            hx-push-url="true"
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
