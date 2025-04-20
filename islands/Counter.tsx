// components/Calc.tsx
import { useMemo } from "preact/hooks";

interface Item {
    id: number;
    name: string;
    price: number;
}

const items: Item[] = [
    { id: 1, name: "Big Mac", price: 95 },
    { id: 2, name: "iPhone 14", price: 25000 },
    { id: 3, name: "Tesla Model S", price: 2700000 },
    { id: 4, name: "Yacht", price: 60000000 },
    { id: 5, name: "MacBook Pro 16", price: 119900 },
];

function formatCZK(value: number) {
    return value.toLocaleString("cs-CZ") + " Kč";
}

function convertCurrency(amount: number, rate: number) {
    return (amount * rate).toLocaleString("cs-CZ", { maximumFractionDigits: 2 });
}

function InterestTable({ amount }: { amount: number }) {
    const rates = [2, 5, 8, 10];
    return (
        <div>
            <h3 class="text-lg font-semibold mt-4 mb-2">Zhodnocení částky</h3>
            <table class="w-full border text-sm">
                <thead>
                <tr class="bg-gray-100">
                    <th class="p-2">Sazba</th>
                    <th class="p-2">Ročně</th>
                    <th class="p-2">Měsíčně</th>
                    <th class="p-2">Denně</th>
                </tr>
                </thead>
                <tbody>
                {rates.map((rate) => {
                    const yearly = (amount * rate) / 100;
                    return (
                        <tr key={rate}>
                            <td class="p-2 font-bold">{rate}%</td>
                            <td class="p-2">{formatCZK(yearly)}</td>
                            <td class="p-2">{formatCZK(yearly / 12)}</td>
                            <td class="p-2">{formatCZK(yearly / 365)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

function UnitConversion({ amount }: { amount: number }) {
    return (
        <div>
            <h3 class="text-lg font-semibold mt-4 mb-2">Převod jednotek</h3>
            <ul class="list-disc list-inside text-sm">
                <li>Tisíce: {(amount / 1e3).toFixed(2)} tis.</li>
                <li>Miliony: {(amount / 1e6).toFixed(2)} mil.</li>
                <li>Miliardy: {(amount / 1e9).toFixed(2)} mld.</li>
                <li>USD (~0.045): {convertCurrency(amount, 0.045)} $</li>
                <li>EUR (~0.04): {convertCurrency(amount, 0.04)} €</li>
            </ul>
        </div>
    );
}

function ItemList({ amount }: { amount: number }) {
    const monthlySaving = 5000;
    const investPercent = 10;

    const timeToAfford = (price: number) => {
        if (monthlySaving <= 0) return "N/A";
        const months = price / monthlySaving;
        return months < 1 ? `${Math.ceil(months * 30)} dní` : `${months.toFixed(1)} měs.`;
    };

    return (
        <div>
            <h3 class="text-lg font-semibold mt-4 mb-2">Co si za to mohu koupit?</h3>
            <ul class="space-y-4">
                {items.map((item) => {
                    const count = Math.floor(amount / item.price);
                    const spent = count * item.price;
                    const remaining = amount - spent;
                    const investCount = Math.floor((amount * investPercent / 100) / item.price);
                    const percentSpent = ((spent / amount) * 100).toFixed(2);

                    return (
                        <li class="border p-3 rounded" key={item.id}>
                            <div class="font-bold">{item.name}</div>
                            <div class="text-sm">Cena: {formatCZK(item.price)}</div>
                            <div class="text-sm">Max kusů: {count}</div>
                            <div class="text-sm">Zbývá: {formatCZK(remaining)}</div>
                            <div class="text-sm">Utraceno: {percentSpent}%</div>
                            <div class="text-sm">Investicí {investPercent}% získáš: {investCount} ks</div>
                            <div class="text-sm">Dosažitelné za: {timeToAfford(item.price)}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function Calc({ amount }: { amount: number }) {
    const vat = amount * 0.21;
    const withVat = amount + vat;

    return (
        <div class="bg-white p-6 rounded shadow space-y-4">
            <h2 class="text-2xl font-bold">FinanceTool výpočty</h2>
            <p class="text-sm">Základní částka: {formatCZK(amount)}</p>
            <p class="text-sm">S DPH (21%): {formatCZK(withVat)}</p>

            <UnitConversion amount={amount} />
            <InterestTable amount={amount} />
            <ItemList amount={amount} />
        </div>
    );
}
