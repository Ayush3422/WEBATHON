import { useState, useEffect } from 'react';
import { Stock } from '../types';
import { STOCKS } from '../constants';

const HISTORY_LENGTH = 30;

const initialStocks: Stock[] = STOCKS.map(stock => ({
  ...stock,
  initialPrice: stock.price,
  dailyChange: 0,
  dailyChangePercent: 0,
  priceHistory: Array(HISTORY_LENGTH).fill(stock.price),
}));

// API fetching constants
const API_URL = 'https://financialmodelingprep.com/api/v3/quote/';
const API_KEY = 'demo'; 
const FETCH_INTERVAL = 20000; // Fetch real data every 20 seconds
const tickersString = STOCKS.map(s => s.ticker).join(',');

// Simulation constants
const SIMULATE_INTERVAL = 5000; // Simulate a price change every 5 seconds

export const useStockPrices = () => {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);

  // Effect for fetching REAL data from the API
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${API_URL}${tickersString}?apikey=${API_KEY}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const quoteMap = new Map<string, any>(data.map(q => [q.symbol, q]));

          setStocks(currentStocks =>
            currentStocks.map(stock => {
              const quote = quoteMap.get(stock.ticker);
              if (quote) {
                // When we get real data, we update the price and other official stats.
                // The simulation interval will then use this new price as its baseline.
                return {
                  ...stock,
                  price: quote.price,
                  initialPrice: quote.open,
                  dailyChange: quote.change,
                  dailyChangePercent: quote.changesPercentage,
                };
              }
              return stock;
            })
          );
        } else {
          console.warn(`Could not fetch valid quotes. Response:`, data);
        }
      } catch (error) {
        console.error(`Failed to fetch stock prices:`, error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Effect for SIMULATING small price fluctuations between API calls
  useEffect(() => {
    const simulatePriceChange = () => {
      setStocks(currentStocks =>
        currentStocks.map(stock => {
          // Calculate a small random change (e.g., up to 0.5% of the price)
          const changePercent = (Math.random() - 0.5) * 0.005; 
          const priceChange = stock.price * changePercent;
          const newPrice = Math.max(0, stock.price + priceChange); // Ensure price doesn't go below zero

          // Recalculate daily change based on the new simulated price
          const newDailyChange = newPrice - stock.initialPrice;
          const newDailyChangePercent = stock.initialPrice === 0 ? 0 : (newDailyChange / stock.initialPrice) * 100;

          const newHistory = [...stock.priceHistory, newPrice].slice(-HISTORY_LENGTH);

          return {
            ...stock,
            price: newPrice,
            dailyChange: newDailyChange,
            dailyChangePercent: newDailyChangePercent,
            priceHistory: newHistory,
          };
        })
      );
    };

    const simulationInterval = setInterval(simulatePriceChange, SIMULATE_INTERVAL);

    return () => clearInterval(simulationInterval);
  }, []); // This effect runs once on mount

  return stocks;
};