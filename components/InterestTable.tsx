
import { interest, czk } from "../utils/financeUtils.ts";

export default function InterestTable({ amount }:{ amount:number }){
  if(!amount) return null;
  const rates=[2,5,8,10];
  return (
    <div class="mt-6">
      <h3 class="text-lg font-semibold mb-2">Zhodnocení částky</h3>
      <table class="min-w-full text-sm border">
        <thead><tr class="bg-pink-600 text-white"><th class="p-2">Sazba</th><th class="p-2">Ročně</th><th class="p-2">Měsíčně</th><th class="p-2">Denně</th></tr></thead>
        <tbody>
        {rates.map(r=>{ const { y,m,d } = interest(amount,r); return (
          <tr key={r} class="text-center"><td class="p-2 font-bold">{r}%</td><td class="p-2">{czk(y)}</td><td class="p-2">{czk(m)}</td><td class="p-2">{czk(d)}</td></tr>
        )})}
        </tbody>
      </table>
    </div>
  );
}
