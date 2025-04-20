
import { useEffect } from "preact/hooks";

export default function useGlobalStyles(){
  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent = `
    :root{--c1:#6366f1;--c2:#8b5cf6;--c3:#ec4899;--c4:#10b981}
    html{scroll-behavior:smooth}
    body{font-family:system-ui,sans-serif}
    header{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3));color:#fff}
    section.bg{background:radial-gradient(circle at 25% 25%,var(--c4)20%,transparent 21%),
               radial-gradient(circle at 75% 75%,var(--c2)15%,transparent 16%),#f3f4f6}
    @media(prefers-color-scheme:dark){
      body{background:#111827;color:#e5e7eb}
      section.bg{background:#1f2937}
    }
    .tt{position:relative}
    .tt span{visibility:hidden;opacity:0;transition:.2s;pointer-events:none;position:absolute;left:50%;bottom:110%;transform:translateX(-50%);background:#4B5563;color:#fff;padding:6px 8px;border-radius:4px;font-size:12px}
    .tt:hover span{visibility:visible;opacity:1}
    .loader{border:4px solid #e5e7eb;border-top-color:var(--c1);border-radius:50%;width:48px;height:48px;animation:spin .6s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}
    `;
    document.head.appendChild(s);
    return ()=>{document.head.removeChild(s);};
  },[]);
}
