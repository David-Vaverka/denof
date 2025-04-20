
import { useState } from "preact/hooks";
import type { Item } from "../data/items.ts";
import type { Currency } from "../data/types.ts";
import { ItemRow } from "./ItemRow.tsx";

interface Props {
  amount:number; share:number; monthly:number; currency:Currency; usdRate:number;
  items:Item[]; setItems:(i:Item[])=>void;
}

export default function ItemsSection({ amount,share,monthly,currency,usdRate,items,setItems }:Props){
  const updPrice = (id:number,p:number)=>setItems(items.map(i=>i.id===id?{...i,price:p}:i));
  const rm = (id:number)=>setItems(items.filter(i=>i.id!==id));
  const addNote = (id:number,t:string)=>
    t.trim() && setItems(items.map(i=>i.id===id? {...i,notes:[...i.notes,{ text:t,date:new Date().toLocaleString('cs-CZ') }]}:i));
  const addItem = (name:string,p:number)=>
    name.trim() && p && setItems([...items,{ id:Date.now(),name,price:p,notes:[] }]);

  const [nName,setNName] = useState(""), [nPrice,setNPrice] = useState("");

  return (
    <section class="mt-8" id="items">
      <h2 class="text-2xl font-bold mb-4">Položky & výpočty</h2>
      <ul class="space-y-4">
        {items.map(it=>(
          <ItemRow key={it.id} it={it} amount={amount} share={share} monthly={monthly}
                   curr={currency} usdRate={usdRate}
                   updPrice={updPrice} rm={rm} addNote={addNote} />
        ))}
      </ul>

      <div class="flex flex-wrap gap-2 items-center mt-4">
        <input class="border p-1 flex-1" placeholder="Název" value={nName}
               onInput={e=>setNName((e.target as HTMLInputElement).value)} />
        <input class="border p-1 w-28" type="number" placeholder="Cena" value={nPrice}
               onInput={e=>setNPrice((e.target as HTMLInputElement).value)} />
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                onClick={()=>{ addItem(nName,Number(nPrice)); setNName(''); setNPrice(''); }}>Přidat</button>
      </div>
    </section>
  );
}
