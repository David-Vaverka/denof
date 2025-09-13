import { AppProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Narwal Store</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />
        <script src="https://unpkg.com/htmx.org@1.9.10" defer></script>
      </head>
      <body f-client-nav>
        <Partial name="menu" id="menu-root" />
        <Partial name="body">
          <Component />
        </Partial>
      </body>
    </html>
  );
}
