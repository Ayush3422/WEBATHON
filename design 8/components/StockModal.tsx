import React, { useEffect } from 'react';
import { Stock } from '../types';
import StockChart from './StockChart';
import CloseIcon from './CloseIcon';

interface StockModalProps {
  stock: Stock;
  onClose: () => void;
}

const StockModal: React.FC<StockModalProps> = ({ stock, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

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
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      aria-labelledby="stock-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700 overflow-hidden relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        style={{ animation: 'fade-in-scale 0.3s forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={`https://logo.clearbit.com/${stock.name.replace(/ Inc\.| Corp\.|, Inc\./, '').toLowerCase()}.com`}
              alt={`${stock.name} logo`}
              className="h-12 w-12 rounded-full bg-gray-700 object-contain"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div>
              <h2 id="stock-modal-title" className="text-2xl font-bold text-white">{stock.name} ({stock.ticker})</h2>
              <p className="text-gray-400">{stock.sector}</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                  <div className="mt-4">
                    <p className={`text-4xl font-semibold ${priceColor}`}>{formatCurrency(stock.price)}</p>
                    <div className={`text-lg font-medium ${priceColor} flex items-center`}>
                      <span>{isPositive ? '+' : ''}{formatCurrency(stock.dailyChange)}</span>
                      <span className="ml-3">({isPositive ? '+' : ''}{stock.dailyChangePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-gray-300 space-y-2">
                    <div className="flex justify-between border-b border-gray-700 py-1"><span>Opening Price:</span> <span className="font-medium text-white">{formatCurrency(stock.initialPrice)}</span></div>
                    <div className="flex justify-between border-b border-gray-700 py-1"><span>Current Price:</span> <span className="font-medium text-white">{formatCurrency(stock.price)}</span></div>
                  </div>
              </div>
              <div className="h-48 md:h-full w-full">
                 <StockChart data={stock.priceHistory} color={chartColor} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockModal;