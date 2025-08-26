
import { Stock } from './types';

// FIX: Omitted `priceHistory` from the type definition as it is initialized dynamically in the useStockPrices hook.
export const STOCKS: Omit<Stock, 'dailyChange' | 'dailyChangePercent' | 'initialPrice' | 'priceHistory'>[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 175.25 },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', price: 340.50 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 135.80 },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', sector: 'Consumer Cyclical', price: 138.10 },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', price: 450.75 },
  { ticker: 'TSLA', name: 'Tesla, Inc.', sector: 'Consumer Cyclical', price: 250.20 },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services', price: 155.60 },
  { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', price: 165.40 },
  { ticker: 'V', name: 'Visa Inc.', sector: 'Financial Services', price: 240.90 },
  { ticker: 'PG', name: 'Procter & Gamble Co.', sector: 'Consumer Defensive', price: 150.30 },
  { ticker: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy', price: 110.00 },
  { ticker: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Healthcare', price: 520.00 },
];
