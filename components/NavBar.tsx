import CartSummary from "./CartSummary.tsx";

export default function NavBar({ cartCount }: { cartCount: number }) {
  return (
    <nav class="flex items-center justify-between p-4 bg-gray-100">
      <a href="/product" class="font-bold">Store</a>
      <form action="/search" method="GET" class="flex-1 mx-4">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          class="w-full p-2 border rounded"
        />
      </form>
      <CartSummary count={cartCount} />
    </nav>
  );
}
