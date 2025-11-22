import { Handlers } from "$fresh/server.ts";

const defaultConfig = {
  label: "Klikni na mě",
  start: 0,
};

export const handler: Handlers = {
  GET() {
    const script = `import { h, render } from "https://esm.sh/preact@10.22.0";
import { useState } from "https://esm.sh/preact@10.22.0/hooks";

const defaultConfig = ${JSON.stringify(defaultConfig)};

const style = document.createElement("style");
style.dataset.denof = "counter-embed";
style.textContent = \`
  .denof-counter { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px 16px; max-width: 280px; background: white; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07); }
  .denof-counter__label { margin: 0 0 10px; color: #0f172a; font-weight: 700; font-size: 16px; }
  .denof-counter__value { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: #111827; font-weight: 700; font-size: 18px; }
  .denof-counter__button { background: linear-gradient(90deg, #0ea5e9, #6366f1); color: white; border: none; padding: 10px 14px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: transform 150ms ease, box-shadow 150ms ease; }
  .denof-counter__button:hover { transform: translateY(-1px); box-shadow: 0 14px 32px rgba(59, 130, 246, 0.35); }
\`;
if (!document.querySelector('style[data-denof="counter-embed"]')) {
  document.head.appendChild(style);
}

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const applyData = (target) => {
  const enriched = { ...defaultConfig };

  if (target.dataset.payload) {
    try {
      Object.assign(enriched, JSON.parse(target.dataset.payload));
    } catch (err) {
      console.warn("Neplatný JSON v data-payload", err);
    }
  }

  if (target.dataset.label) enriched.label = target.dataset.label;
  if (target.dataset.start)
    enriched.start = parseNumber(target.dataset.start, enriched.start);

  return enriched;
};

const Counter = ({ label, start }) => {
  const [count, setCount] = useState(start);

  return h("div", { class: "denof-counter" }, [
    h("p", { class: "denof-counter__label" }, label),
    h("p", { class: "denof-counter__value", role: "status", "aria-live": "polite" }, \`Počítadlo: \\${count}\`),
    h(
      "button",
      { class: "denof-counter__button", type: "button", onClick: () => setCount((value) => value + 1) },
      "Přidat klik"
    ),
  ]);
};

const mountAll = () => {
  const targets = document.querySelectorAll('[data-denof-embed="counter"]');
  targets.forEach((target) => {
    const data = applyData(target);
    render(h(Counter, data), target);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAll);
} else {
  mountAll();
}
`;

    return new Response(script, {
      headers: {
        "content-type": "application/javascript; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  },
};
