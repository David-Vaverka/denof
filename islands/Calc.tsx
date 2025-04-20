
import { useState, useEffect } from "preact/hooks";
import useGlobalStyles from "../hooks/useGlobalStyles.ts";
import Header from "../components/Header.tsx";
import AmountSection from "../components/AmountSection.tsx";
import Controls from "../components/Controls.tsx";
import UnitConversion from "../components/UnitConversion.tsx";
import InterestTable from "../components/InterestTable.tsx";
import Projection from "../components/Projection.tsx";
import PieChart from "../components/PieChart.tsx";
import ItemsSection from "../components/ItemsSection.tsx";

import { DEFAULT_ITEMS } from "../data/items.ts";
import type { Item } from "../data/items.ts";
import type { Currency } from "../data/types.ts";
import { czk } from "../utils/financeUtils.ts";

interface Props{ amount:number; }

export default function Calc({ amount:initial }:Props){
  useGlobalStyles();
  const [amount,setAmount]=useState(initial||0);
  const [monthly,setMonthly]=useState(5_000);
  const [share,setShare]=useState(10);
  const [usdRate,setUsdRate]=useState(0.045);
  const [currency,setCurrency]=useState<Currency>('CZK');
  const [items,setItems]=useState<Item[]>(()=>{ try{ return JSON.parse(sessionStorage.getItem('finance_items')||'null')||DEFAULT_ITEMS; }catch{ return DEFAULT_ITEMS; }});

  useEffect(()=>sessionStorage.setItem('finance_items',JSON.stringify(items)),[items]);
  const toggleCur=()=>setCurrency(currency==='CZK'?'USD':currency==='USD'?'EUR':'CZK');
  const vat=amount*0.21;

  return (
    <>
      <Header />
      <main class="max-w-3xl mx-auto px-4 space-y-8 pb-12">
        <AmountSection amount={amount} setAmount={setAmount} />
        <Controls monthly={monthly} setMonthly={setMonthly}
                  share={share} setShare={setShare}
                  usdRate={usdRate} setUsdRate={setUsdRate}
                  currency={currency} toggleCur={toggleCur} />
        <section class="bg p-6 rounded shadow space-y-6">
          <h2 class="text-2xl font-bold">FinanceTool výpočty</h2>
          <p>Částka: {czk(amount)} • s DPH (21 %): {czk(vat+amount)}</p>

          <UnitConversion amount={amount} usdRate={usdRate} />
          <InterestTable amount={amount} />
          <Projection monthly={monthly} />
          <PieChart items={items} amount={amount} />
        </section>

        <ItemsSection amount={amount} share={share} monthly={monthly}
                      currency={currency} usdRate={usdRate}
                      items={items} setItems={setItems} />
      </main>
    </>
  );
}
