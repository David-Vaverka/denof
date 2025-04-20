
import { czk } from "../utils/financeUtils.ts";
import LineChart from "./LineChart.tsx";

export default function Projection({ monthly }:{ monthly:number }){
  if(!monthly) return null;
  const rates=[2,5,8];
  const fv=(P:number,r:number)=>{ const i=r/100/12; return P*((Math.pow(1+i,12*10)-1)/i); };
  return (
    <div id="charts">
      <h3 class="text-lg font-semibold mt-6 mb-2">Projekce za 10 let (měsíčně {czk(monthly)})</h3>
      <table class="min-w-full text-sm border mb-4">
        <thead><tr class="bg-green-600 text-white"><th class="p-2">Sazba</th><th class="p-2">Budoucí hodnota</th></tr></thead>
        <tbody>
          {rates.map(r=>(
            <tr key={r}><td class="p-2 font-bold text-center">{r}%</td><td class="p-2 text-center">{czk(Number(fv(monthly,r).toFixed(0)))}</td></tr>
          ))}
        </tbody>
      </table>
      <LineChart monthly={monthly} />
    </div>
  );
}
