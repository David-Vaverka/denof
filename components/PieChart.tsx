
import { useRef } from "preact/hooks";
import type { Item } from "../data/items.ts";
import { useChart } from "../hooks/useChart.ts";

export default function PieChart({ items, amount }:{ items:Item[]; amount:number }){
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const data = items.filter(i=>i.price<=amount).slice(0,6);
  if(!data.length) return null;
  useChart(canvasRef.current,{
    type:"pie",
    data:{
      labels:data.map(i=>i.name),
      datasets:[{ data:data.map(i=>i.price),
        backgroundColor:["#6366f1","#8b5cf6","#ec4899","#10b981","#f59e0b","#ef4444"] }]
    },
    options:{ plugins:{ legend:{ position:"bottom" } } }
  });
  return (
    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-2">Rozložení výdajů</h3>
      <div class="relative h-72 w-72 mx-auto"><canvas ref={canvasRef} class="w-full h-full" /></div>
    </div>
  );
}
