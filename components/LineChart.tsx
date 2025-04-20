
import { useRef } from "preact/hooks";
import { useChart } from "../hooks/useChart.ts";

export default function LineChart({ monthly }:{ monthly:number }){
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const years = Array.from({length:10},(_,_i)=>_i+1);
  const rates=[2,5,8];
  useChart(canvasRef.current, {
    type:"line",
    data:{
      labels:years.map(y=>`${y} r`),
      datasets:rates.map(r=>({
        label:`${r}% p.a.`,
        data:years.map(y=>monthly*((Math.pow(1+r/100/12,y*12)-1)/(r/100/12))),
        fill:false,
        tension:0.3
      }))
    },
    options:{ plugins:{ legend:{ position:"bottom" } }, scales:{ y:{ ticks:{ callback:(v:any)=>v>=1e6?(v/1e6)+' M':v } } } }
  });
  return <div class="relative h-64"><canvas ref={canvasRef} class="w-full h-full" /></div>;
}
