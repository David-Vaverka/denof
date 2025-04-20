
interface Props{ amount:number; setAmount:(n:number)=>void; }

export default function AmountSection({ amount, setAmount }: Props){
  const PRESETS=[1e3,2e3,5e3,1e4,2e4,5e4,1e5,2e5,5e5,1e6,2e6,5e6,1e7];
  return (
    <section class="bg p-4 rounded shadow space-y-3" id="calc">
      <h2 class="text-xl font-bold mb-1">Zadej částku (CZK)</h2>
      <input type="number" class="border rounded p-2 w-full text-center text-lg" value={amount}
             onInput={e=>setAmount(Number((e.target as HTMLInputElement).value)||0)} />
      <div class="flex flex-wrap gap-2 justify-center">
        {PRESETS.map(v=>(
          <button key={v} class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={()=>setAmount(v)}>{v>=1e6?v/1e6+' M':v/1e3+' K'}</button>
        ))}
      </div>
    </section>
  );
}
