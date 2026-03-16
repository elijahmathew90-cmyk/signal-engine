const API_KEY = DN3GBb0ydidbgzl3rnTZCQD85OBbYmYq;

const WATCHLIST = [
  { ticker: 'PLTR',  name: 'Palantir Technologies', signal: 'BUY',  conf: 91, entry: 118.00, target: 155.00, stop: 105.00, tf: 'SHORT', risk: 'MED',  pos: 7.0, reason: 'Government AI contracts expanding fast. AIP platform gaining enterprise traction. High conviction setup.' },
  { ticker: 'APP',   name: 'AppLovin Corp',          signal: 'BUY',  conf: 93, entry: 310.00, target: 420.00, stop: 285.00, tf: 'SHORT', risk: 'MED',  pos: 8.0, reason: 'Ad tech algorithm printing money. Revenue growth accelerating each quarter. Momentum extremely strong.' },
  { ticker: 'AXON',  name: 'Axon Enterprise',        signal: 'BUY',  conf: 88, entry: 520.00, target: 640.00, stop: 490.00, tf: 'LONG',  risk: 'LOW',  pos: 6.0, reason: 'Near monopoly on law enforcement tech. Recurring SaaS revenue growing steadily. Defensive growth name.' },
  { ticker: 'RDDT',  name: 'Reddit Inc',             signal: 'BUY',  conf: 82, entry: 145.00, target: 210.00, stop: 128.00, tf: 'LONG',  risk: 'MED',  pos: 5.0, reason: 'Data licensing deals with AI companies undervalued. Ad revenue just starting to scale. Early innings.' },
  { ticker: 'RKLB',  name: 'Rocket Lab USA',         signal: 'BUY',  conf: 79, entry: 22.00,  target: 35.00,  stop: 18.00,  tf: 'LONG',  risk: 'MED',  pos: 4.0, reason: 'Only credible SpaceX competitor at scale. Neutron rocket catalyst incoming. Deeply undervalued vs peers.' },
  { ticker: 'IONQ',  name: 'IonQ Inc',               signal: 'BUY',  conf: 74, entry: 28.00,  target: 48.00,  stop: 22.00,  tf: 'LONG',  risk: 'HIGH', pos: 3.0, reason: 'Pure play quantum computing. Government contracts building. High risk but massive upside if thesis plays out.' },
  { ticker: 'HOOD',  name: 'Robinhood Markets',      signal: 'BUY',  conf: 81, entry: 42.00,  target: 65.00,  stop: 36.00,  tf: 'SHORT', risk: 'MED',  pos: 5.0, reason: 'Crypto trading surge driving revenue. New products expanding TAM. Cheap relative to fintech peers.' },
  { ticker: 'TMDX',  name: 'TransMedics Group',      signal: 'BUY',  conf: 85, entry: 95.00,  target: 140.00, stop: 82.00,  tf: 'LONG',  risk: 'MED',  pos: 5.0, reason: 'Organ transplant logistics revolutionized. Near monopoly position. Revenue growing over 80% YoY.' },
  { ticker: 'SOUN',  name: 'SoundHound AI',          signal: 'BUY',  conf: 72, entry: 12.00,  target: 22.00,  stop: 9.00,   tf: 'SHORT', risk: 'HIGH', pos: 3.0, reason: 'Voice AI platform with real enterprise contracts. Undervalued vs NVDA-adjacent AI peers. Speculative but real.' },
  { ticker: 'SMCI',  name: 'Super Micro Computer',   signal: 'HOLD', conf: 65, entry: 400.00, target: 550.00, stop: 360.00, tf: 'LONG',  risk: 'HIGH', pos: 3.0, reason: 'AI server demand intact but accounting concerns linger. Hold existing position, no new entries until clarity.' },
  { ticker: 'MELI',  name: 'MercadoLibre',           signal: 'BUY',  conf: 87, entry: 1800.00,target: 2300.00,stop: 1650.00,tf: 'LONG',  risk: 'LOW',  pos: 6.0, reason: 'Latin Americas Amazon plus PayPal combined. Fintech and ecommerce both accelerating. Underowned by US funds.' },
  { ticker: 'CELH',  name: 'Celsius Holdings',       signal: 'HOLD', conf: 61, entry: 28.00,  target: 45.00,  stop: 22.00,  tf: 'LONG',  risk: 'MED',  pos: 3.0, reason: 'Energy drink market share growing but distribution hiccups with Pepsi. Wait for next earnings before adding.' },
];

const PORTFOLIO = {
  current: 127400,
  goal: 1000000,
  ytdReturn: 27.4,
  monthsLeft: 9.5,
  requiredMonthly: 18.2,
  cash: 14,
  winRate: 74,
  totalSignals: 156
};