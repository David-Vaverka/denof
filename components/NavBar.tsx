import CartSummary from "./CartSummary.tsx";

export default function NavBar({ cartCount }: { cartCount: number }) {
  return (
    <nav class="navbar navbar-expand-lg bg-light border-bottom">
      <div class="container">
        <a href="/product" class="navbar-brand fw-bold">
          Narwal Store
        </a>
        <form action="/search" method="GET" class="d-flex flex-grow-1 mx-3">
          <input
            type="text"
            name="q"
            placeholder="Search..."
            class="form-control me-2"
          />
        </form>
        <CartSummary count={cartCount} />
      </div>
    </nav>
  );
}
