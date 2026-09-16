export type PriceTrend = 'up' | 'down' | 'stable';

export interface MarketPrice {
  id: string;
  productName: string;
  price: number;
  unit: string; // e.g., 'libra', 'kg', 'saco'
  region: string;
  trend: PriceTrend;
  lastUpdated: string; // ISO date string
  source: string; // e.g., 'Comunidad', 'Ministerio de Agricultura'
}
