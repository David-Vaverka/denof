
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

const defaultStatusConfig = {
  label: "Stav služby",
  status: "Online",
  detail: "Vše běží hladce",
  tone: "success",
};

export const handler: Handlers = {
  GET() {
    const script = String.raw`import { h, render } from "https://esm.sh/preact@10.22.0";
import { useEffect, useRef, useState } from "https://esm.sh/preact@10.22.0/hooks";

const defaultCounterConfig = ${JSON.stringify(defaultCounterConfig)};
const defaultLoaderConfig = ${JSON.stringify(defaultLoaderConfig)};
const defaultStatusConfig = ${JSON.stringify(defaultStatusConfig)};

const style = document.createElement("style");
style.dataset.denof = "counter-embed";
style.textContent = `
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
  .denof-status { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; max-width: 360px; background: white; box-shadow: 0 12px 34px rgba(0, 0, 0, 0.06); display: grid; gap: 8px; }
  .denof-status__meta { display: flex; align-items: center; gap: 10px; }
  .denof-status__dot { width: 12px; height: 12px; border-radius: 999px; background: #22c55e; box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.12); transition: background 120ms ease, box-shadow 120ms ease; }
  .denof-status__label { margin: 0; font-weight: 800; color: #0f172a; }
  .denof-status__detail { margin: 0; color: #475569; }
  .denof-status__refresh { width: fit-content; background: #0f172a; color: white; border: none; padding: 8px 12px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: transform 150ms ease, box-shadow 150ms ease; }
  .denof-status__refresh:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.25); }
  .denof-status__timestamp { font-size: 13px; color: #0ea5e9; margin: 0; }
`;
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
  if (target.dataset.start) enriched.start = parseNumber(target.dataset.start, enriched.start);

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

const applyStatusData = (target) => {
  const enriched = { ...defaultStatusConfig };

  if (target.dataset.payload) {
    try {
      Object.assign(enriched, JSON.parse(target.dataset.payload));
    } catch (err) {
      console.warn("Neplatný JSON v data-payload", err);
    }
  }

  if (target.dataset.label) enriched.label = target.dataset.label;
  if (target.dataset.status) enriched.status = target.dataset.status;
  if (target.dataset.detail) enriched.detail = target.dataset.detail;
  if (target.dataset.tone) enriched.tone = target.dataset.tone;

  return enriched;
};

const Counter = ({ label, start }) => {
  const [count, setCount] = useState(start);

  return h("div", { class: "denof-counter" }, [
    h("p", { class: "denof-counter__label" }, label),
    h(
      "p",
      { class: "denof-counter__value", role: "status", "aria-live": "polite" },
      `Počítadlo: ${"${count}"}`
    ),
    h(
      "button",
      { class: "denof-counter__button", type: "button", onClick: () => setCount((value) => value + 1) },
      "Přidat klik"
    ),
  ]);
};

const mountCounters = () => {
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

const toneStyles = {
  success: { dot: "#22c55e", shadow: "rgba(34, 197, 94, 0.12)" },
  warning: { dot: "#f59e0b", shadow: "rgba(245, 158, 11, 0.18)" },
  danger: { dot: "#ef4444", shadow: "rgba(239, 68, 68, 0.18)" },
};

const StatusCard = ({ label, status, detail, tone }) => {
  const [timestamp, setTimestamp] = useState(new Date());
  const toneStyle = toneStyles[tone] || toneStyles.success;

  useEffect(() => {
    const id = setInterval(() => setTimestamp(new Date()), 4000);
    return () => clearInterval(id);
  }, []);

  return h("div", { class: "denof-status" }, [
    h("div", { class: "denof-status__meta" }, [
      h("span", {
        class: "denof-status__dot",
        style: `background:${toneStyle.dot}; box-shadow: 0 0 0 6px ${toneStyle.shadow};`,
        role: "presentation",
      }),
      h("p", { class: "denof-status__label" }, `${label}: ${status}`),
    ]),
    h("p", { class: "denof-status__detail" }, detail),
    h(
      "button",
      {
        class: "denof-status__refresh",
        type: "button",
        onClick: () => setTimestamp(new Date()),
      },
      "Aktualizovat stav"
    ),
    h(
      "p",
      { class: "denof-status__timestamp", role: "status", "aria-live": "polite" },
      `Naposledy zkontrolováno ${"${timestamp.toLocaleTimeString(\"cs-CZ\")}"}`
    ),
  ]);
};

const mountStatusCards = () => {
  const targets = document.querySelectorAll('[data-denof-embed="status"]');
  targets.forEach((target) => {
    const data = applyStatusData(target);
    render(h(StatusCard, data), target);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    mountCounters();
    mountLazyLoaders();
    mountStatusCards();
  });
} else {
  mountCounters();
  mountLazyLoaders();
  mountStatusCards();
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
