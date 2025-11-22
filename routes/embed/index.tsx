import productData from "../../data/product.json" assert { type: "json" };

const embedUrl = "/embed/product";
const defaultPayload = {
  title: productData.title,
  price: productData.price,
  oldPrice: productData.priceRrp,
  currency: "EUR",
  description:
    "Robotski sesalnik z 8200 Pa in pametno navigacijo. Idealno za velike površine in hitro čiščenje.",
  image: (productData.images as string[])[0],
  rating: productData.rank?.rating ?? 4.8,
  count: productData.rank?.count ?? 4,
  coupon: productData.coupon?.percentualValue ?? 0,
};

const codeSample = `<div data-denof-embed="product"
  data-title="${defaultPayload.title}"
  data-price="${defaultPayload.price}"
  data-old-price="${defaultPayload.oldPrice}"
  data-currency="${defaultPayload.currency}"
  data-description="${defaultPayload.description}"
  data-image="${defaultPayload.image}"
  data-rating="${defaultPayload.rating}"
  data-count="${defaultPayload.count}"
  data-coupon="${defaultPayload.coupon}"></div>
<script type="module" src="${embedUrl}"></script>`;

export default function EmbedPage() {
  return (
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-12 col-lg-6">
          <h1 class="fw-bold">Vdelana Preact kartica izdelka</h1>
          <p class="text-secondary">
            Na tem naslovu najdeš generiran modul, ki renderira Preact komponento neposredno
            v poljuben HTML. Dodaj <code>div</code> z atributom <code>data-denof-embed="product"</code>, posreduj
            podatke in naloži skripto iz <code>{embedUrl}</code>. Ni potrebe po dodatnih
            build korakih – vse dela samo s Preactom.
          </p>

          <div class="bg-light border rounded-4 p-3">
            <p class="mb-2 fw-semibold">Hitro kopiranje</p>
            <pre class="bg-dark text-white rounded-3 p-3 small overflow-auto" style="max-height: 320px;">
              <code>{codeSample}</code>
            </pre>
          </div>

          <h2 class="h5 mt-4">Podprti atributi</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">data-title, data-description, data-image</li>
            <li class="list-group-item">data-price, data-old-price, data-currency</li>
            <li class="list-group-item">data-rating, data-count, data-coupon</li>
            <li class="list-group-item">data-payload (JSON string s poljubnimi polji zgoraj)</li>
          </ul>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-white">
              <div class="d-flex align-items-center justify-content-between">
                <span class="fw-semibold">Živa predogledna kartica</span>
                <span class="badge text-bg-dark">{embedUrl}</span>
              </div>
            </div>
            <div class="card-body">
              <div
                data-denof-embed="product"
                data-title={defaultPayload.title}
                data-price={defaultPayload.price}
                data-old-price={defaultPayload.oldPrice}
                data-currency={defaultPayload.currency}
                data-description={defaultPayload.description}
                data-image={defaultPayload.image}
                data-rating={defaultPayload.rating}
                data-count={defaultPayload.count}
                data-coupon={defaultPayload.coupon}
              ></div>
              <script type="module" src={embedUrl}></script>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
