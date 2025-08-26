import React, { useState, useEffect } from 'react';
import { Stock } from '../types';
import StockChart from './StockChart';

interface StockCardProps {
  stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const [priceChangeClass, setPriceChangeClass] = useState('');

  useEffect(() => {
    if (stock.priceHistory.length < 2) return;

    const currentPrice = stock.priceHistory[stock.priceHistory.length - 1];
    const prevPrice = stock.priceHistory[stock.priceHistory.length - 2];

    if (currentPrice > prevPrice) {
      setPriceChangeClass('animate-flash-green');
    } else if (currentPrice < prevPrice) {
      setPriceChangeClass('animate-flash-red');
    }

    const timer = setTimeout(() => setPriceChangeClass(''), 700);

    return () => clearTimeout(timer);
  }, [stock.price, stock.priceHistory]);
  
  const isPositive = stock.dailyChange >= 0;
  const priceColor = isPositive ? 'text-green-400' : 'text-red-400';
  const chartColor = isPositive ? '#4ade80' : '#f87171';

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div 
      className="group relative bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xl font-bold text-white">{stock.ticker}</p>
          <p className="text-sm text-gray-400 truncate w-32 group-hover:hidden transition-opacity duration-300">{stock.name}</p>
        </div>
        <img
          src={`https://logo.clearbit.com/${stock.name.replace(/ Inc\.| Corp\.|, Inc\./, '').toLowerCase()}.com`}
          alt={`${stock.name} logo`}
          className="h-8 w-8 rounded-full bg-gray-700 object-contain"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <div className="mt-4">
        <p className={`text-2xl font-semibold rounded-md ${priceColor} ${priceChangeClass}`}>
          {formatCurrency(stock.price)}
        </p>
        <div className={`text-sm font-medium ${priceColor} flex items-center`}>
          <span>{isPositive ? '+' : ''}{formatCurrency(stock.dailyChange)}</span>
          <span className="ml-2">({isPositive ? '+' : ''}{stock.dailyChangePercent.toFixed(2)}%)</span>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex-grow">
        <StockChart data={stock.priceHistory} color={chartColor} />
      </div>

      <div className="absolute inset-0 bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-white truncate">{stock.name}</h3>
        <p className="text-sm text-gray-300">{stock.sector}</p>
        <div className="mt-4 text-xs text-gray-400 space-y-1">
            <div className="flex justify-between"><span>Open:</span> <span>{formatCurrency(stock.initialPrice)}</span></div>
            <div className="flex justify-between"><span>Current:</span> <span>{formatCurrency(stock.price)}</span></div>
            <div className="flex justify-between"><span>Change:</span> <span className={priceColor}>{formatCurrency(stock.dailyChange)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;