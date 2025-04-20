
export default function Header(){
  return (
    <header class="sticky top-0 z-50 shadow-md">
      <nav class="max-w-3xl mx-auto flex justify-between items-center px-4 py-3">
        <a href="#" class="text-xl font-bold">FinanceTool</a>
        <ul class="flex gap-4 text-sm font-semibold">
          <li><a href="#calc"   class="hover:underline">Kalkulačka</a></li>
          <li><a href="#charts" class="hover:underline">Grafy</a></li>
          <li><a href="#items"  class="hover:underline">Položky</a></li>
        </ul>
      </nav>
    </header>
  );
}
