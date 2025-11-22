const embedUrl = "/embed/product";
const defaultPayload = {
  label: "Klikni na mě",
  start: 0,
};

const codeSample = `<div data-denof-embed="counter"
  data-label="${defaultPayload.label}"
  data-start="${defaultPayload.start}"></div>
<script type="module" src="${embedUrl}"></script>`;

const fullPageSample = `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Embed counter</title>
  </head>
  <body>
    <main style="padding: 24px; background: #f8fafc; min-height: 100vh;">
      <h1>Ukázková stránka s Preact counterem</h1>
      <div data-denof-embed="counter"
        data-label="${defaultPayload.label}"
        data-start="${defaultPayload.start}"></div>
      <script type="module" src="${embedUrl}"></script>
    </main>
  </body>
</html>`;

export default function EmbedPage() {
  return (
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-12 col-lg-6">
          <h1 class="fw-bold">Vdelaná Preact counter komponenta</h1>
          <p class="text-secondary">
            Na této adrese najdeš generovaný modul, který sám inicializuje Preact a
            vykreslí jednoduchý click-counter. Stačí přidat <code>div</code> s atributem
            <code>data-denof-embed="counter"</code>, případně poslat počáteční hodnotu a
            popisek přes data atributy nebo JSON payload. Skript Preact načte a zbytek
            zařídí za tebe.
          </p>

          <div class="bg-light border rounded-4 p-3">
            <p class="mb-2 fw-semibold">Rychlé vložení</p>
            <pre class="bg-dark text-white rounded-3 p-3 small overflow-auto" style="max-height: 320px;">
              <code>{codeSample}</code>
            </pre>
          </div>

          <h2 class="h5 mt-4">Podporované atributy</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">data-label – text nad počítadlem</li>
            <li class="list-group-item">data-start – počáteční hodnota kliků</li>
            <li class="list-group-item">data-payload – JSON string se stejnými klíči</li>
          </ul>

          <div class="bg-light border rounded-4 p-3 mt-4">
            <p class="mb-2 fw-semibold">Celý HTML příklad</p>
            <p class="text-secondary small mb-3">
              Příklad samostatné stránky, která si jen vloží <code>div</code> a
              načte generovaný skript. Ten si sám dotáhne Preact, zpracuje data
              atributy a vykreslí counter.
            </p>
            <pre class="bg-dark text-white rounded-3 p-3 small overflow-auto" style="max-height: 340px;">
              <code>{fullPageSample}</code>
            </pre>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-white">
              <div class="d-flex align-items-center justify-content-between">
                <span class="fw-semibold">Živý náhled counteru</span>
                <span class="badge text-bg-dark">{embedUrl}</span>
              </div>
            </div>
            <div class="card-body">
              <div
                data-denof-embed="counter"
                data-label={defaultPayload.label}
                data-start={defaultPayload.start}
              ></div>
              <script type="module" src={embedUrl}></script>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
