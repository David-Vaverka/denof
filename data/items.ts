
export interface Note { text: string; date: string; }
export interface Item { id: number; name: string; price: number; notes: Note[]; }

// 10 položek se 10 fakta o penězích ke každé
export const DEFAULT_ITEMS: Item[] = [
  {
    "id": 1,
    "name": "Big Mac",
    "price": 95,
    "notes": [
      "🇨🇿 Cena v ČR (~€3.80) je o 25 % nižší než v eurozóně.",
      "🌍 Big‑Mac‑Index používá burger jako srovnání kupní síly už od 1986 (The Economist).",
      "💰 V USA stál Big Mac 1986 jen 1,60 USD; průměrná inflace burgeru ~3,4 %.",
      "📈 V Česku zdražil 2022→2024 o cca 22 Kč (~30 %).",
      "🕑 Mediánový Čech na Big Mac pracuje ~6 minut; Brazilec 35 minut.",
      "🍔 Prodá se ~550 mil. Big Maců ročně (1,5 mil. / den).",
      "📊 Marže McDonald’s na burgeru přesahuje 60 %.",
      "🏆 V menu od 1968 – přežil 8 velkých krizí.",
      "💸 Týdenní burger investovaný do S&P 500 = 470 000 Kč po 30 letech (7 % p.a.).",
      "🌱 Veganská varianta (McPlant) je o 15 Kč dražší."
    ]
  },
  {
    "id": 2,
    "name": "iPhone 15 Pro",
    "price": 34990,
    "notes": [
      "💸 Za 17 let iPhone zdražil 2× (první model 499 USD).",
      "✨ „Pro“ tvoří 60 % tržeb iPhone; marže Apple > 40 %.",
      "🔄 2 roky používání → zůstatková hodnota ~55 %.",
      "🔋 Výroba kusu (~523 USD) = 1,5 % měsíční spotřeby kobaltu na světě.",
      "🏦 V USA splátky 24×0 % (Apple Card).",
      "📈 1 mil. iPhonů = tržby 1 mld USD.",
      "⚖️ 187 g => 187 Kč/gram.",
      "🌍 70 % dílů z Asie; letecká doprava +6 USD/ks.",
      "🚀 Akcie AAPL 2007×50 – iPhone “zaplatí sám sebe” 5×.",
      "🎧 Bez nabíječky = úspora 5 USD/ks."
    ]
  },
  {
    "id": 3,
    "name": "Tesla Model 3 Highland",
    "price": 990000,
    "notes": [
      "🔌 Baterie ~22 % ceny vozu.",
      "⚡ Spotřeba 14 kWh/100 km → 50 000 km/rok = 46 000 Kč elektřiny.",
      "🏭 Výroba kusu = 10 h práce; mzdy < 3 % ceny.",
      "🚗 5‑leté TCO o 18 % nižší než diesel střední třídy.",
      "💸 3 roky drží 63 % hodnoty.",
      "🌍 EU dotace 170 000 Kč snižuje cenu o 17 %.",
      "📈 CO₂ kredity Tesla > 2 mld USD/rok.",
      "🔋 Náklad DC nabití 100→0 % ~500 Kč.",
      "💰 Leasing 5 let 5,9 % = 19 100 Kč/m.",
      "⚖️ 1 830 kg → 541 Kč/kg."
    ]
  },
  {
    "id": 4,
    "name": "Rolex Submariner",
    "price": 290000,
    "notes": [
      "⌚ Ceny rostou ~7 %/rok – porážejí zlato.",
      "💎 Šedý trh +30 % nad retail (kvóty).",
      "🛠️ Ruční montáž 12 měsíců; práce 60 % nákladů.",
      "📈 Index Rolex +132 % za 10 let.",
      "🌊 Vodotěsnost 300 m; test stojí 800 CHF/h.",
      "💰 Pojištění 1,2 % ceny/rok.",
      "⚖️ 155 g → 1 870 Kč/gram.",
      "🏦 Suby v covidu předčily objem švýc. dluhopisů.",
      "📦 Krabička 60 USD, prodává se za 200 USD.",
      "🪙 Nákup BTC 2013 místo hodinek = 14 mil Kč dnes."
    ]
  },
  {
    "id": 5,
    "name": "MacBook Pro 16 (2024)",
    "price": 89990,
    "notes": [
      "💸 Marže Apple ~38 %.",
      "🔋 M‑chip = 30 % ceny.",
      "♻️ Unibody 100 % recykl. Al – úspora 190 kg CO₂.",
      "📈 3 roky = 55 % hodnoty na bazar.",
      "⚡ 8 h/den → 700 Kč/rok elektřina.",
      "🛡️ AppleCare+ = 11 % ceny.",
      "🏧 Splátky 12× 0 % v USA.",
      "🚀 SSD upgrade přirážka 700 %.",
      "📦 Letecky doprava 10 USD/ks.",
      "🧑‍💻 CZ dev vydělá cenu za 1,5 měsíce."
    ]
  },
  {
    "id": 6,
    "name": "PlayStation 5",
    "price": 13990,
    "notes": [
      "🎮 HW marže < 1 %; zisk z her a PS Plus.",
      "⚙️ Výroba klesla 450 → 390 USD díky 6 nm.",
      "📈 PS5 tržby předběhly PS4 o 8 měs.",
      "💰 5 let DLC útrata 420 USD.",
      "🏷️ V Brazílii 4× dražší (clo 60 %).",
      "🔌 200 W; ročně 1 050 Kč elektřina.",
      "📦 Slim redesign snížil objem o 30 %.",
      "🎁 Limitky +80 % nad retail.",
      "🌍 EU = 30 % prodejů.",
      "🕹️ DualSense Edge 219 USD (⅓ ceny konzole)."
    ]
  },
  {
    "id": 7,
    "name": "Samsung Galaxy S24 Ultra",
    "price": 39990,
    "notes": [
      "📸 200 Mpx senzor = 17 % BOM.",
      "💸 Trade‑in sleva 800 USD marketing.",
      "📉 12 m fall‑off -42 % ceny.",
      "🔋 29 Wh video = 0,5 Kč/h.",
      "🌍 75 % výroba Vietnam.",
      "🛰️ SOS modul +9 USD/ks.",
      "📱 OLED panel 14 % ceny.",
      "⚖️ 232 g = 172 Kč/g.",
      "📦 Bez adaptéru úspora 2 USD.",
      "💰 Samsung Pay výnos 0,27 USD/den."
    ]
  },
  {
    "id": 8,
    "name": "Škoda Octavia RS",
    "price": 890000,
    "notes": [
      "🚘 RS = 23 % Octavií; marže 18 %.",
      "⛽ 6,8 l/100 km => 45 000 Kč/rok.",
      "⚙️ Výbava +12 % ceny.",
      "📈 Po 3 l zůstatek 64 %.",
      "💸 Operák 0 % = 9 690 Kč/m.",
      "🌍 Logistika 600 EUR/auto.",
      "💶 CO₂ daň DE 110 €/rok.",
      "🛠️ Servis 5 let 29 900 Kč.",
      "🔄 Zůstatek leasing 35 %.",
      "📊 11 % nových aut v ČR."
    ]
  },
  {
    "id": 9,
    "name": "LG OLED G4 65″",
    "price": 72990,
    "notes": [
      "📺 OLED panel 40 % ceny.",
      "💡 HDR 110 W → 1 000 Kč/rok.",
      "💰 QD‑OLED +12 % dražší.",
      "📈 OLED zlevňují 18 %/rok.",
      "🎁 Cashback 10 000 Kč.",
      "⚙️ Wallmount marže 70 %.",
      "🛡️ 5‑letá záruka 6 999 Kč.",
      "🌍 Lodí 18 USD/TV.",
      "🔄 5 let zůstatek 22 %.",
      "🎮 HDMI2.1 licence 0,15 USD."
    ]
  },
  {
    "id": 10,
    "name": "Gulfstream G800",
    "price": 1950000000,
    "notes": [
      "✈️ Letová hodina 110 000 Kč.",
      "🛢️ 3,4 t paliva/h.",
      "🏗️ Výroba 24 m, zálohy 6×5 %.",
      "📈 Backlog 24 mld USD.",
      "🛩️ Avionika 20 % ceny.",
      "💸 Pojištění 2 mil Kč/rok.",
      "🌍 Dolet 14 500 km.",
      "📊 10 let zůstatek 48 %.",
      "🛠️ Overhaul 120 mil Kč.",
      "⚖️ 24 t => 81 000 Kč/kg."
    ]
  }
];
