// components/ItemRow.tsx
import { useState, useRef } from "preact/hooks";
import type { Item } from "../data/items.ts";
import { maxItems, eta, nf, czk, interest } from "../utils/financeUtils.ts";
import type { Currency } from "../data/types.ts";
import { useChart } from "../hooks/useChart.ts";

interface RowProps {
    it: Item;
    amount:   number;
    share:    number;
    monthly:  number;
    curr:     Currency;
    usdRate:  number;
    updPrice: (id: number, p: number) => void;
    rm:       (id: number) => void;
    addNote:  (id: number, t: string) => void;
}

/* ---------- Sloupcový “úrokový” minigraf ---------- */
function SavingBar({ price }: { price: number }) {
    const cRef = useRef<HTMLCanvasElement | null>(null);
    const rates = [2, 5, 8];
    const data  = rates.map(r => interest(price, r).y); // roční úrok
    useChart(cRef.current, {
        type: "bar",
        data: {
            labels: rates.map(r => `${r}%`),
            datasets: [
                {
                    data,
                    backgroundColor: ["#10b981", "#8b5cf6", "#ef4444"],
                },
            ],
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    ticks: { callback: (v: any) => v >= 1_000 ? `${nf(v / 1_000)} K` : v },
                },
            },
        },
    });
    return <canvas ref={cRef} class="w-40 h-24 mx-auto" />;
}

export function ItemRow({
                            it,
                            amount,
                            share,
                            monthly,
                            curr,
                            usdRate,
                            updPrice,
                            rm,
                            addNote,
                        }: RowProps) {
    const [draft, setDraft]     = useState("");
    const [open,  setOpen]      = useState(false);          // toggle poznámek
    const cnt    = maxItems(amount, it.price);
    const invCnt = maxItems((amount * share) / 100, it.price);

    const fmtPrice = (p: number) =>
        curr === "CZK"
            ? czk(p)
            : `${nf(p * (curr === "USD" ? usdRate : 0.04), 2)} ${curr}`;

    // libovolné „další“ fakta (můžeš jich kdykoli přidat kolik chceš)
    const extraFacts = [
        `Roční úrok 5 % = ${czk(interest(it.price, 5).y)}`,
        `Denní úrok 5 % = ${czk(interest(it.price, 5).d)}`,
    ];

    return (
        <li class="border p-3 rounded text-sm space-y-2 bg-white dark:bg-gray-800">
            {/* Hlavička  */}
            <div class="flex justify-between items-start">
                <span class="font-bold">{it.name}</span>
                <div class="flex gap-2">
                    <button
                        class="text-blue-500"
                        title={open ? "Skrýt detaily" : "Zobrazit detaily"}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "–" : "＋"}
                    </button>
                    <button class="text-red-500" title="Odstranit" onClick={() => rm(it.id)}>
                        ×
                    </button>
                </div>
            </div>

            {/* Základní data */}
            <div>Cena: {fmtPrice(it.price)}</div>
            <div>Max kusů: {cnt}</div>
            <div>Investicí {share}%: {invCnt} ks</div>
            <div>Dosažitelné za: {eta(it.price, monthly)}</div>

            {/* Editace ceny + poznámka */}
            <div class="flex flex-wrap gap-2">
                <input
                    class="border p-1 w-28"
                    type="number"
                    placeholder="Nová cena"
                    onBlur={(e) =>
                        updPrice(it.id, Number((e.target as HTMLInputElement).value) || it.price)
                    }
                />
                <input
                    class="border p-1 flex-1"
                    placeholder="Poznámka"
                    value={draft}
                    onInput={(e) => setDraft((e.target as HTMLInputElement).value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && draft.trim()) {
                            addNote(it.id, draft);
                            setDraft("");
                        }
                    }}
                />
            </div>

            {/* Rozbalovací detaily */}
            {open && (
                <div class="space-y-2 mt-2">
                    {/* mini‑graf */}
                    <SavingBar price={it.price} />

                    {/* poznámky z dat + extra fakta */}
                    <h4 class="font-semibold">Fakta / Poznámky:</h4>
                    <ul class="list-disc list-inside space-y-1">
                        {it.notes.map((n, i) => (
                            <li key={i}>
                                <span class="text-gray-500">{n.date && `${n.date}: `}</span>
                                {n.text}
                            </li>
                        ))}
                        {extraFacts.map((t, i) => (
                            <li key={`x${i}`} class="text-indigo-600">
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}
