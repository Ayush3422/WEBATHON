import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { Stock } from '../types';
import Header from '../components/Header';
import StockChart from '../components/StockChart';

interface StockDetailPageProps {
  username: string | null;
  email: string | null;
  onLogout: () => void;
  stocks: Stock[];
}

const companyInfoCache = new Map<string, string>();

const StockDetailPage: React.FC<StockDetailPageProps> = ({ username, email, onLogout, stocks }) => {
  const { ticker } = useParams<{ ticker: string }>();
  const [companyInfo, setCompanyInfo] = useState<string>('');
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');
  const [priceChangeClass, setPriceChangeClass] = useState('');

  const stock = useMemo(() => stocks.find(s => s.ticker === ticker), [stocks, ticker]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (!stock) return;

      if (companyInfoCache.has(stock.name)) {
        setCompanyInfo(companyInfoCache.get(stock.name)!);
        return;
      }

      setIsLoadingInfo(true);
      setErrorInfo('');
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Provide a brief, one-paragraph professional introduction for the company: ${stock.name}. Focus on its main business and market position.`,
        });
        const info = response.text;
        companyInfoCache.set(stock.name, info);
        setCompanyInfo(info);
      } catch (err) {
        console.error("Failed to fetch company info from Gemini API:", err);
        setErrorInfo('Could not load company introduction.');
      } finally {
        setIsLoadingInfo(false);
      }
    };

    fetchCompanyInfo();
  }, [stock]);

  useEffect(() => {
    if (!stock || stock.priceHistory.length < 2) return;

    const currentPrice = stock.priceHistory[stock.priceHistory.length - 1];
    const prevPrice = stock.priceHistory[stock.priceHistory.length - 2];

    if (currentPrice > prevPrice) {
      setPriceChangeClass('animate-flash-green');
    } else if (currentPrice < prevPrice) {
      setPriceChangeClass('animate-flash-red');
    }

    const timer = setTimeout(() => setPriceChangeClass(''), 700);

    return () => clearTimeout(timer);
  }, [stock]);

  const renderContent = () => {
    if (!stock) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">Stock not found.</h1>
          <Link to="/stocks" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
            &larr; Back to Market Overview
          </Link>
        </div>
      );
    }
    
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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/stocks" className="text-sm text-indigo-400 hover:text-indigo-300">
            &larr; Back to Market Overview
          </Link>
        </div>
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={`https://logo.clearbit.com/${stock.name.replace(/ Inc\.| Corp\.|, Inc\./, '').toLowerCase()}.com`}
            alt={`${stock.name} logo`}
            className="h-16 w-16 rounded-full bg-gray-700 object-contain"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div>
            <h1 className="text-4xl font-bold text-white">{stock.name} ({stock.ticker})</h1>
            <p className="text-gray-400 text-lg">{stock.sector}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gray-800/70 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                        <p className="text-gray-400 text-sm">Current Price</p>
                        <p className={`text-5xl font-semibold rounded-lg p-2 -m-2 ${priceColor} ${priceChangeClass}`}>
                          {formatCurrency(stock.price)}
                        </p>
                        <div className={`text-xl font-medium ${priceColor} flex items-center`}>
                            <span>{isPositive ? '+' : ''}{formatCurrency(stock.dailyChange)}</span>
                            <span className="ml-3">({isPositive ? '+' : ''}{stock.dailyChangePercent.toFixed(2)}%)</span>
                        </div>
                    </div>
                     <div className="text-sm text-gray-300 space-y-2 mt-4 md:mt-0 md:text-right">
                        <div className="flex justify-between md:justify-end md:space-x-4"><span className="text-gray-400">Open:</span> <span className="font-medium text-white">{formatCurrency(stock.initialPrice)}</span></div>
                        <div className="flex justify-between md:justify-end md:space-x-4"><span className="text-gray-400">Day Range:</span> <span className="font-medium text-white">{formatCurrency(Math.min(...stock.priceHistory))} - {formatCurrency(Math.max(...stock.priceHistory))}</span></div>
                    </div>
                </div>
                <div className="h-96 w-full mt-6">
                    <StockChart data={stock.priceHistory} color={chartColor} />
                </div>
            </div>
            <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-4">About {stock.name}</h2>
                {isLoadingInfo && <div className="text-gray-400 animate-pulse">Loading company info...</div>}
                {errorInfo && <div className="text-red-400">{errorInfo}</div>}
                {!isLoadingInfo && companyInfo && <p className="text-gray-300 leading-relaxed">{companyInfo}</p>}
            </div>
        </div>
      </main>
    );
  }

  return (
     <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <Header username={username} email={email} onLogout={onLogout}/>
        {renderContent()}
      </div>
    </div>
  );
};

export default StockDetailPage;