import CartSummary from "./CartSummary.tsx";

export default function NavBar({ cartCount }: { cartCount: number }) {
  return (
    <nav class="navbar bg-light px-3">
      <a href="/product" class="navbar-brand">Store</a>
      <form action="/search" method="GET" class="d-flex flex-grow-1 mx-3">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          class="form-control me-2"
        />
      </form>
      <div class="ms-auto">
        <CartSummary count={cartCount} />
      </div>
    </nav>
  );
}
