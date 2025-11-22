import { Handlers } from "$fresh/server.ts";
import productData from "../../data/product.json" assert { type: "json" };

const defaultCard = {
  title: productData.title as string,
  price: productData.price as number,
  oldPrice: productData.priceRrp as number,
  currency: "EUR",
  description:
    "Robotski sesalnik z 8200 Pa, samodejnim pomivanjem in pametnimi senzorji za velike površine.",
  image: (productData.images as string[])[0],
  rating: productData.rank?.rating ?? 4.8,
  count: productData.rank?.count ?? 4,
  coupon: productData.coupon?.percentualValue,
};

export const handler: Handlers = {
  GET() {
    const script = `import { h, render } from "https://esm.sh/preact@10.22.0";
import { useMemo } from "https://esm.sh/preact@10.22.0/hooks";

const defaultCard = ${JSON.stringify(defaultCard)};

const style = document.createElement("style");
style.dataset.denof = "product-embed";
style.textContent = `
  .denof-card { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 14px 38px rgba(15, 23, 42, 0.08); max-width: 360px; }
  .denof-card__media { position: relative; }
  .denof-card__media img { width: 100%; height: 220px; object-fit: cover; display: block; }
  .denof-card__badge { position: absolute; top: 12px; left: 12px; background: #111827; color: white; padding: 6px 12px; border-radius: 999px; font-weight: 700; font-size: 12px; letter-spacing: 0.04em; }
  .denof-card__body { padding: 16px 18px 20px; display: grid; gap: 10px; }
  .denof-card__title { font-size: 18px; color: #0f172a; font-weight: 700; margin: 0; line-height: 1.35; }
  .denof-card__desc { color: #4b5563; font-size: 14px; margin: 0; line-height: 1.6; }
  .denof-card__price { display: flex; align-items: baseline; gap: 8px; }
  .denof-card__price strong { font-size: 22px; color: #0f172a; }
  .denof-card__price small { color: #6b7280; text-decoration: line-through; }
  .denof-card__cta { background: linear-gradient(90deg, #111827, #1f2937); color: white; border: none; padding: 12px 14px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: transform 150ms ease, box-shadow 150ms ease; }
  .denof-card__cta:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(17, 24, 39, 0.12); }
  .denof-card__rating { color: #f59e0b; font-weight: 700; font-size: 14px; }
  .denof-card__meta { display: flex; justify-content: space-between; align-items: center; }
`;
if (!document.querySelector('style[data-denof="product-embed"]')) {
  document.head.appendChild(style);
}

const formatPrice = (value, currency) =>
  new Intl.NumberFormat("sl-SI", { style: "currency", currency }).format(value);

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const applyData = (target) => {
  const enriched = { ...defaultCard };

  if (target.dataset.payload) {
    try {
      const parsed = JSON.parse(target.dataset.payload);
      Object.assign(enriched, parsed);
    } catch (err) {
      console.warn("Neveljaven JSON v data-payload", err);
    }
  }

  if (target.dataset.title) enriched.title = target.dataset.title;
  if (target.dataset.image) enriched.image = target.dataset.image;
  if (target.dataset.description) enriched.description = target.dataset.description;
  if (target.dataset.currency) enriched.currency = target.dataset.currency;
  if (target.dataset.rating)
    enriched.rating = parseNumber(target.dataset.rating, enriched.rating);
  if (target.dataset.count)
    enriched.count = parseNumber(target.dataset.count, enriched.count);
  if (target.dataset.coupon)
    enriched.coupon = parseNumber(target.dataset.coupon, enriched.coupon);
  if (target.dataset.price)
    enriched.price = parseNumber(target.dataset.price, enriched.price);
  if (target.dataset.oldPrice)
    enriched.oldPrice = parseNumber(target.dataset.oldPrice, enriched.oldPrice ?? enriched.price * 1.35);

  return enriched;
};

const ProductCard = (props) => {
  const { title, description, price, oldPrice, currency, image, rating, count, coupon } = props;
  const badgeLabel = useMemo(() =>
    coupon ? `-${coupon}%` : "TOP IZBIRA",
  [coupon]);

  return h("article", { class: "denof-card" }, [
    h("div", { class: "denof-card__media" }, [
      h("img", { src: image, alt: title }),
      h("span", { class: "denof-card__badge" }, badgeLabel),
    ]),
    h("div", { class: "denof-card__body" }, [
      h("p", { class: "denof-card__rating", role: "img", "aria-label": `${rating} zvezdic od ${count} ocen` }, `★ ${rating} (${count})`),
      h("h3", { class: "denof-card__title" }, title),
      h("p", { class: "denof-card__desc" }, description),
      h("div", { class: "denof-card__price" }, [
        h("strong", null, formatPrice(price, currency)),
        oldPrice ? h("small", null, formatPrice(oldPrice, currency)) : null,
      ]),
      h("div", { class: "denof-card__meta" }, [
        h("span", { style: "color:#10b981;font-weight:700;font-size:14px;" }, "Na zalogi"),
        h("button", { class: "denof-card__cta", type: "button" }, "Dodaj v košarico"),
      ]),
    ]),
  ]);
};

const mountAll = () => {
  const targets = document.querySelectorAll('[data-denof-embed="product"]');
  targets.forEach((target) => {
    const data = applyData(target);
    render(h(ProductCard, data), target);
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
