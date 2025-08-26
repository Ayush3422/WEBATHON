export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  initialPrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  priceHistory: number[];
}