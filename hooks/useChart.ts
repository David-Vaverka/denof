
import { useRef, useEffect } from "preact/hooks";
import type { JSX } from "preact";

export function useChart(canvas: JSX.Element | null, config: any){
  const chartRef = useRef<any>(null);
  useEffect(()=>{
    if(!canvas) return;
    (async()=>{
      const { Chart } = await import("https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js");
      if(chartRef.current) chartRef.current.destroy();
      chartRef.current = new Chart(canvas as any, config);
    })();
    return ()=>{ if(chartRef.current) chartRef.current.destroy(); };
  },[canvas,config]);
}
