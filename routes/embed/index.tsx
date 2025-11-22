
const embedUrl = "http://localhost:8000/embed/product";
const lazySrc = "http://localhost:8000/embed/lazy-app";
const downloadUrl = "/embed/download";
const defaultPayload = {
  label: "Klikni na mě",
  start: 0,
};
const lazyDefaults = {
  buttonLabel: "Načíst mini appku",
  loadedLabel: "Aplikace načtena",
  loadSrc: lazySrc,
};
const statusDefaults = {
  label: "Stav služby",
  status: "Online",
  detail: "Vše běží hladce",
  tone: "success",
};

const codeSample = `<div data-denof-embed="counter"
  data-label="${defaultPayload.label}"
  data-start="${defaultPayload.start}"></div>
<div data-denof-embed="status"
  data-label="${statusDefaults.label}"
  data-status="${statusDefaults.status}"
  data-detail="${statusDefaults.detail}"></div>
<div data-denof-embed="loader"
  data-button-label="${lazyDefaults.buttonLabel}"
  data-loaded-label="${lazyDefaults.loadedLabel}"
  data-load-src="${lazyDefaults.loadSrc}"></div>
<script type="module" src="${embedUrl}"></script>`;

const ssrHtml = `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Denof UI embed</title>
    <link rel="preload" href="${embedUrl}" as="script" />
  </head>
  <body>
    <div data-denof-embed="counter" data-label="${defaultPayload.label}" data-start="2"></div>
    <div data-denof-embed="status" data-label="${statusDefaults.label}" data-status="Online" data-detail="Vše běží hladce"></div>
    <div data-denof-embed="loader" data-button-label="${lazyDefaults.buttonLabel}" data-loaded-label="${lazyDefaults.loadedLabel}" data-load-src="${lazyDefaults.loadSrc}"></div>
    <script type="module" src="${embedUrl}" defer></script>
  </body>
</html>`;

const fullPageSample = `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Embed counter</title>
    <style>
      body { margin: 0; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
      main { padding: 24px; display: grid; gap: 18px; max-width: 900px; margin: 0 auto; }
    </style>
  </head>
  <body>
    <main>
      <h1>Ukázková stránka s Preact komponentami</h1>
      <p>Komponenty se vykreslí ze skriptu dostupného na <strong>http://localhost:8000/embed/product</strong>. Stačí vložit div a script tag.</p>
      <div data-denof-embed="counter"
        data-label="${defaultPayload.label}"
        data-start="${defaultPayload.start}"></div>
      <div data-denof-embed="status"
        data-label="${statusDefaults.label}"
        data-status="${statusDefaults.status}"
        data-detail="${statusDefaults.detail}"></div>
      <div data-denof-embed="loader"
        data-button-label="${lazyDefaults.buttonLabel}"
        data-loaded-label="${lazyDefaults.loadedLabel}"
        data-load-src="${lazyDefaults.loadSrc}"></div>
      <script type="module" src="${embedUrl}"></script>
    </main>
  </body>
</html>`;

export default function EmbedPage() {
  return (
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-12 col-lg-6">
          <h1 class="fw-bold">Vdelaná knihovna Preact komponent</h1>
          <p class="text-secondary">
            Na této adrese najdeš generovaný modul, který sám inicializuje Preact a
            vykreslí embeddované komponenty (click counter, stavová karta a lazy loader).
            Stačí přidat <code>div</code> s atributem <code>data-denof-embed</code>, případně
            poslat data přes atributy nebo JSON payload. Skript Preact načte a zbytek
            zařídí za tebe.
          </p>
          <p class="text-secondary">
            Lazy loader komponenta po kliknutí dotáhne zadaný modul a zobrazí jeho
            obsah. Můžeš ho využít pro postupné načítání těžších částí aplikace nebo
            dalších UI prvků až ve chvíli, kdy o ně uživatel projeví zájem.
          </p>

          <div class="bg-light border rounded-4 p-3">
            <p class="mb-2 fw-semibold">Rychlé vložení tří komponent</p>
            <pre class="bg-dark text-white rounded-3 p-3 small overflow-auto" style="max-height: 320px;">
              <code>{codeSample}</code>
            </pre>
          </div>

          <h2 class="h5 mt-4">Podporované atributy</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">data-label – text nad počítadlem nebo kartou</li>
            <li class="list-group-item">data-start – počáteční hodnota kliků</li>
            <li class="list-group-item">data-status – text stavu (Online/Warning...)</li>
            <li class="list-group-item">data-detail – doplňující popis stavu</li>
            <li class="list-group-item">data-tone – barevný tón stavové tečky (success|warning|danger)</li>
            <li class="list-group-item">data-button-label – text na lazy tlačítku</li>
            <li class="list-group-item">data-loaded-label – text po úspěšném načtení</li>
            <li class="list-group-item">data-load-src – URL modulu, který se má dotáhnout</li>
            <li class="list-group-item">data-payload – JSON string se stejnými klíči</li>
          </ul>

          <div class="bg-light border rounded-4 p-3 mt-4">
            <p class="mb-2 fw-semibold">SSR-friendly HTML skeleton</p>
            <p class="text-secondary small mb-3">
              Minimalistická stránka, která přednačte embed skript přes <code>preload</code>,
              hydratuje komponenty po načtení a nechává obsah kompatibilní se SSR.
            </p>
            <pre class="bg-dark text-white rounded-3 p-3 small overflow-auto" style="max-height: 340px;">
              <code>{ssrHtml}</code>
            </pre>
          </div>

          <div class="bg-light border rounded-4 p-3 mt-4">
            <p class="mb-2 fw-semibold">Celý HTML příklad</p>
            <p class="text-secondary small mb-3">
              Příklad samostatné stránky, která si jen vloží <code>div</code> a
              načte generovaný skript z <code>http://localhost:8000/embed/product</code>.
              Skript si sám dotáhne Preact, zpracuje data atributy a vykreslí counter,
              stavovou kartu i lazy loader.
            </p>
            <pre class="bg-dark text-white rounded-3 p-3 small overflow-auto" style="max-height: 340px;">
              <code>{fullPageSample}</code>
            </pre>
            <a class="btn btn-dark mt-3" href={downloadUrl} download>
              Stáhnout hotovou HTML stránku
            </a>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card shadow-sm border-0 mb-3">
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

          <div class="card shadow-sm border-0 mb-3">
            <div class="card-header bg-white">
              <div class="d-flex align-items-center justify-content-between">
                <span class="fw-semibold">Živá stavová karta</span>
                <span class="badge text-bg-dark">SSR + hook</span>
              </div>
            </div>
            <div class="card-body">
              <div
                data-denof-embed="status"
                data-label={statusDefaults.label}
                data-status={statusDefaults.status}
                data-detail={statusDefaults.detail}
              ></div>
              <script type="module" src={embedUrl}></script>
            </div>
          </div>

          <div class="card shadow-sm border-0">
            <div class="card-header bg-white">
              <div class="d-flex align-items-center justify-content-between">
                <span class="fw-semibold">Lazy loader ukázka</span>
                <span class="badge text-bg-dark">/embed/lazy-app</span>
              </div>
            </div>
            <div class="card-body">
              <div
                data-denof-embed="loader"
                data-button-label={lazyDefaults.buttonLabel}
                data-loaded-label={lazyDefaults.loadedLabel}
                data-load-src={lazyDefaults.loadSrc}
              ></div>
              <script type="module" src={embedUrl}></script>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
