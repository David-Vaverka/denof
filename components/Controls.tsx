
import type { Currency } from "../data/types.ts";

interface Props{
  monthly:number; setMonthly:(n:number)=>void;
  share:number;   setShare:(n:number)=>void;
  usdRate:number; setUsdRate:(n:number)=>void;
  currency:Currency; toggleCur:()=>void;
}

export default function Controls({ monthly,setMonthly,share,setShare,usdRate,setUsdRate,currency,toggleCur }:Props){
  const inputs = [
    {label:"Měsíční úspora",val:monthly,set:setMonthly,step:1,w:32},
    {label:"Investiční %",  val:share,  set:setShare,   step:1,w:20},
    {label:"Kurz CZK→USD",  val:usdRate,set:setUsdRate,step:0.001,w:32},
  ];
  return (
    <section class="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-wrap gap-6 items-end">
      {inputs.map(i=>(
        <div key={i.label} class="flex flex-col">
          <label class="text-sm font-semibold mb-1">{i.label}</label>
          <input type="number" step={i.step} class={`border p-1 w-${i.w}`} value={i.val}
                 onInput={e=>i.set(Number((e.target as HTMLInputElement).value)||0)} />
        </div>
      ))}
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={toggleCur}>Přepnout měnu ({currency})</button>
    </section>
  );
}
