# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

Then open http://localhost:8000/product to see the sample product page with cart updates. The UI uses Bootstrap 5 and HTMX to swap HTML snippets without leaving the page. Product information, images and specs are loaded from `data/product.json`, and items added to the cart are persisted in `data/cart.json`.

### Features

- Mobile-first navigation bar with cart count and on-demand search overlay
- Image gallery with fixed image dimensions, lazy thumbnails, keyboard navigation, and a CSS hover zoom
- Detailed product info including rating, coupon notice and spec list
- Add-to-cart button updates the cart count without reloading
- Search overlay fetched via HTMX; server-side suggestions appear as you type without leaving the page
- JS counter loads only after clicking "Show Counter", proving no custom JS is sent initially
- Category page (`/category/dorbeckovku`) showing sample products
- Hamburger menu fetched on demand; its island code downloads only after the menu snippet is requested
- Notes demo at `/notes` uses HTMX to append entries that are stored in `data/notes.json`

This will watch the project directory and restart as necessary.
