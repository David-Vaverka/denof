import { Handlers } from "$fresh/server.ts";

const styles = String.raw`
  .denof-lazy-app { padding: 14px 16px; border-radius: 12px; background: white; box-shadow: 0 12px 34px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb; }
  .denof-lazy-app__title { margin: 0 0 8px; font-weight: 800; color: #0f172a; font-size: 18px; }
  .denof-lazy-app__text { margin: 0 0 12px; color: #475569; }
  .denof-lazy-app__cta { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(90deg, #22c55e, #16a34a); color: white; padding: 10px 14px; border-radius: 10px; text-decoration: none; font-weight: 700; }
`;

const script = String.raw`import { h, render } from "https://esm.sh/preact@10.22.0";

const LazyApp = () => {
  return h("div", { class: "denof-lazy-app" }, [
    h("p", { class: "denof-lazy-app__title" }, "Mini aplikace byla načtena"),
    h(
      "p",
      { class: "denof-lazy-app__text" },
      "Tento blok se stáhne až po kliknutí na tlačítko a může v sobě načítat další UI knihovnu."
    ),
    h(
      "a",
      {
        class: "denof-lazy-app__cta",
        href: "https://deno.land",
        target: "_blank",
        rel: "noreferrer",
      },
      "Přejít na dokumentaci"
    ),
  ]);
};

export async function mountLazyApp(target) {
  const existingStyle = document.querySelector('style[data-denof="lazy-app"]');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.dataset.denof = "lazy-app";
    style.textContent = ${JSON.stringify(styles)};
    document.head.appendChild(style);
  }

  render(h(LazyApp, {}), target);
}

export default mountLazyApp;

export const handler: Handlers = {
  GET() {
    return new Response(script, {
      headers: {
        "content-type": "application/javascript; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  },
};
