import { AppProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
    return (
        <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>FinanceTool</title>
            <link rel="stylesheet" href="/styles.css" />
        </head>

        {/* ✔ f-client-nav spouští partial navigaci */}
        <body f-client-nav>
        {/* obalíme celý obsah jedním partialem */}
        <Partial name="body">
            <Component />
        </Partial>
        </body>
        </html>
    );
}
