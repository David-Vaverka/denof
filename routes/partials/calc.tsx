import { Partial } from "$fresh/runtime.ts";
import Calc from "../../islands/Counter.tsx";

export default function CalcPartial(req: Request) {
    const url = new URL(req.url);
    const amount = Number(url.searchParams.get("amount") || "0");

    return (
        <Partial name="calc">
            <Calc amount={amount} />
        </Partial>
    );
}
