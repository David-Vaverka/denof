import { Handlers } from "$fresh/server.ts";

const embedUrl = "/embed/product";
const lazySrc = "/embed/lazy-app";

const fullPageHtml = `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Denof UI embed demo</title>
    <style>
      body { margin: 0; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
      main { padding: 32px; display: grid; gap: 24px; }
      .section { background: white; border-radius: 14px; padding: 18px; box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0; }
      .section h2 { margin-top: 0; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <main>
      <h1>Embedované komponenty z Denof UI</h1>
      <div class="section">
        <h2>Click counter</h2>
        <div data-denof-embed="counter" data-label="Klikni na mě" data-start="2"></div>
      </div>
      <div class="section">
        <h2>Lazy loader</h2>
        <div data-denof-embed="loader" data-button-label="Načíst appku" data-loaded-label="Hotovo" data-load-src="${lazySrc}"></div>
      </div>
      <script type="module" src="${embedUrl}"></script>
    </main>
  </body>
</html>`;

export const handler: Handlers = {
  GET() {
    return new Response(fullPageHtml, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
        "content-disposition": "attachment; filename=denof-embed.html",
      },
    });
  },
};
