# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

Then open http://localhost:8000/product to see the sample product page with cart updates. The UI uses Bootstrap 5 for styling and HTMX to swap HTML snippets without leaving the page. Product information, images and specs are loaded from `data/product.json`, and items added to the cart are persisted in `data/cart.json`.

### Features

- Responsive navigation bar with search field and cart badge
- Image gallery with HTMX-powered thumbnail swapping
- Detailed product info including rating, coupon notice and spec list
- Add-to-cart button updates the cart badge without reloading

This will watch the project directory and restart as necessary.
