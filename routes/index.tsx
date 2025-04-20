import { Handlers, PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import Calc from "../islands/Counter.tsx";

interface Data {
    amount: number;
}

export const handler: Handlers<Data> = {
    GET(req, ctx) {
        const url = new URL(req.url);
        const amount = Number(url.searchParams.get("amount") ?? "1000");
        return ctx.render({ amount });
    },
};

export default function Home({ data }: PageProps<Data>) {
    console.log(data.amount, "data.amount")
    return (
        <div f-client-nav class="p-6 space-y-4">
             <a href="/" f-partial="/partials/calc">Routes</a>
            <form
                method="GET"
                action={`?amount=${data.amount}`}
                f-partial="/partials/calc"
                onInput={(e) => (e.currentTarget as HTMLFormElement).requestSubmit()}
                class="space-x-2"
            >
                <input
                    type="number"
                    name="amount"
                    value={data.amount}
                    class="border p-2 rounded"
                />
            </form>

            <Partial name="calc">
                <Calc amount={data.amount} />
            </Partial>
        </div>
    );
}
