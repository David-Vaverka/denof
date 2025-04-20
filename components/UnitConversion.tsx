
import { units, nf } from "../utils/financeUtils.ts";

interface Props{ amount:number; usdRate:number; }

export default function UnitConversion({ amount, usdRate }: Props){
  if(!amount) return null;
  const u = units(amount);
  return (
    <div>
      <h3 class="text-lg font-semibold mt-4 mb-2">Převod jednotek</h3>
      <table class="min-w-full text-sm border">
        <thead><tr class="bg-indigo-600 text-white">
          <th class="p-2">CZK</th><th class="p-2">Tisíce</th><th class="p-2">Miliony</th><th class="p-2">Miliardy</th>
          <th class="p-2">USD</th><th class="p-2">EUR</th></tr></thead>
        <tbody><tr class="text-center">
          <td class="p-2">{nf(amount)}</td>
          <td class="p-2">{u.tis} K</td>
          <td class="p-2">{u.mil} M</td>
          <td class="p-2">{u.mld} G</td>
          <td class="p-2">{nf(amount*usdRate,2)} $</td>
          <td class="p-2">{nf(amount*0.04,2)} €</td>
        </tr></tbody>
      </table>
    </div>
  );
}
