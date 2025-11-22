import { Handlers } from "$fresh/server.ts";

const defaultCounterConfig = {
  label: "Klikni na mě",
  start: 0,
};

const defaultLoaderConfig = {
  buttonLabel: "Načíst mini aplikaci",
  loadedLabel: "Aplikace načtena",
  loadSrc: "/embed/lazy-app",
};

export const handler: Handlers = {
  GET() {
    const script = `import { h, render } from "https://esm.sh/preact@10.22.0";
import { useRef, useState } from "https://esm.sh/preact@10.22.0/hooks";

const defaultCounterConfig = ${JSON.stringify(defaultCounterConfig)};
const defaultLoaderConfig = ${JSON.stringify(defaultLoaderConfig)};

const style = document.createElement("style");
style.dataset.denof = "counter-embed";
style.textContent = \`
  .denof-counter { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px 16px; max-width: 280px; background: white; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07); }
  .denof-counter__label { margin: 0 0 10px; color: #0f172a; font-weight: 700; font-size: 16px; }
  .denof-counter__value { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: #111827; font-weight: 700; font-size: 18px; }
  .denof-counter__button { background: linear-gradient(90deg, #0ea5e9, #6366f1); color: white; border: none; padding: 10px 14px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: transform 150ms ease, box-shadow 150ms ease; }
  .denof-counter__button:hover { transform: translateY(-1px); box-shadow: 0 14px 32px rgba(59, 130, 246, 0.35); }
  .denof-loader { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 14px 16px; max-width: 360px; background: #f8fafc; color: #0f172a; }
  .denof-loader__button { background: #0f172a; color: white; border: none; padding: 10px 14px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: transform 150ms ease, box-shadow 150ms ease; }
  .denof-loader__button:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.25); }
  .denof-loader__button:disabled { opacity: 0.6; cursor: not-allowed; }
  .denof-loader__status { margin: 8px 0 0; font-size: 14px; color: #0ea5e9; }
  .denof-loader__error { margin: 8px 0 0; font-size: 14px; color: #dc2626; }
\`;
if (!document.querySelector('style[data-denof="counter-embed"]')) {
  document.head.appendChild(style);
}

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const applyCounterData = (target) => {
  const enriched = { ...defaultCounterConfig };

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

const applyLoaderData = (target) => {
  const enriched = { ...defaultLoaderConfig };

  if (target.dataset.payload) {
    try {
      Object.assign(enriched, JSON.parse(target.dataset.payload));
    } catch (err) {
      console.warn("Neplatný JSON v data-payload", err);
    }
  }

  if (target.dataset.buttonLabel) enriched.buttonLabel = target.dataset.buttonLabel;
  if (target.dataset.loadedLabel) enriched.loadedLabel = target.dataset.loadedLabel;
  if (target.dataset.loadSrc) enriched.loadSrc = target.dataset.loadSrc;

  return enriched;
};

const Counter = ({ label, start }) => {
  const [count, setCount] = useState(start);

  return h("div", { class: "denof-counter" }, [
    h("p", { class: "denof-counter__label" }, label),
    h(
      "p",
      { class: "denof-counter__value", role: "status", "aria-live": "polite" },
      \`Počítadlo: ${"${count}"}\`
    ),
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
    const data = applyCounterData(target);
    render(h(Counter, data), target);
  });
};

const LazyLoader = ({ buttonLabel, loadedLabel, loadSrc }) => {
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("loading");
    try {
      const target = containerRef.current;
      if (!target) throw new Error("Cílový element není připraven");
      const module = await import(loadSrc);
      const mount = module.default || module.mountLazyApp;
      if (typeof mount !== "function") {
        throw new Error("Chybí funkce mountLazyApp");
      }
      await mount(target);
      setState("done");
    } catch (err) {
      console.error("Nepodařilo se načíst aplikaci", err);
      setError("Nepodařilo se načíst aplikaci. Zkuste to prosím znovu.");
      setState("error");
    }
  };

  return h("div", { class: "denof-loader" }, [
    h("div", { ref: containerRef }),
    state === "idle"
      ? h(
          "button",
          { class: "denof-loader__button", type: "button", onClick: handleClick },
          buttonLabel
        )
      : null,
    state === "loading"
      ? h(
          "button",
          { class: "denof-loader__button", type: "button", disabled: true },
          "Načítám…"
        )
      : null,
    state === "done"
      ? h(
          "p",
          { class: "denof-loader__status", role: "status", "aria-live": "polite" },
          loadedLabel
        )
      : null,
    state === "error"
      ? h(
          "p",
          { class: "denof-loader__error", role: "alert" },
          error || "Chyba při načítání."
        )
      : null,
  ]);
};

const mountLazyLoaders = () => {
  const targets = document.querySelectorAll('[data-denof-embed="loader"]');
  targets.forEach((target) => {
    const data = applyLoaderData(target);
    render(h(LazyLoader, data), target);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    mountAll();
    mountLazyLoaders();
  });
} else {
  mountAll();
  mountLazyLoaders();
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
