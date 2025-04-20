
export const nf = (v:number, d=0) => v.toLocaleString("cs-CZ", { maximumFractionDigits: d });
export const czk = (v:number) => nf(v) + " Kč";
export const units = (a:number) => ({ tis: nf(a/1e3,2), mil: nf(a/1e6,2), mld: nf(a/1e9,2) });
export const interest = (p:number,r:number) => ({ y: p*r/100, m: p*r/1200, d: p*r/36500 });
export const maxItems = (a:number,p:number) => Math.floor(a/p);
export const eta = (p:number,m:number) => !m ? "∞" : p/m < 1 ? `${Math.ceil(p/m*30)} dní` : `${(p/m).toFixed(1)} měs.`;
