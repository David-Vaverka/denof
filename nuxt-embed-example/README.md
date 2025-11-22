# Nuxt embed example

Tento příklad ukazuje architekturu, kde Nuxt 3 slouží jako render engine a externí server (Node/PHP) dodává payload, který se rendruje na HTML.

## Struktura
- `components/bridge/PageBridge.vue` – vstupní bod, který přijme payload a vykreslí bloky v základním layoutu.
- `components/blocks/*` – jednotlivé bloky (hero, product list) a `BlockRenderer` jako přepínač podle `block.type`.
- `server/routes/render-page.post.ts` – endpoint pro payload → HTML.
- `server/routes/render-block.get.ts` – endpoint pro vykreslení jedné komponenty podle dotazu.
- `server/api/page-home.get.ts` + `pages/index.vue` – čistý Nuxt SSR scénář.
- `demo-server` – ukázkový Node server, který simuluje PHP: pošle payload na Nuxt a vloží HTML do své stránky.

## Spuštění
1. **Nuxt dev server**
   ```bash
   cd nuxt-embed-example
   npm install
   npm run dev
   ```
   Běží na http://localhost:3000.

2. **Node demo server**
   ```bash
   cd nuxt-embed-example/demo-server
   npm install
   npm start
   ```
   Běží na http://localhost:4000.

## Endpoints
- `POST http://localhost:3000/render-page` s tělem `{ "payload": {...} }` vrátí `{ html }` pro celou stránku.
- `GET http://localhost:3000/render-block?component=hero&props=...` vrátí HTML fragment pro jeden blok.
- `http://localhost:4000/` – Node server → Nuxt `/render-page` → vlastní šablona.
- `http://localhost:4000/hero-demo` – Node server → Nuxt `/render-block` → vlastní šablona.

Když později vyměníš Node za PHP, stačí dodržet stejný payload a volat stejné Nuxt endpointy.
