import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import StockCard from '../components/StockCard';
import SearchIcon from '../components/SearchIcon';
import About from '../components/About';
import { Stock } from '../types';
import { useDebounce } from '../hooks/useDebounce';

interface StocksPageProps {
  username: string | null;
  email: string | null;
  onLogout: () => void;
  stocks: Stock[];
}

const StocksPage: React.FC<StocksPageProps> = ({ username, email, onLogout, stocks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredStocks = useMemo(() => {
    return stocks.filter(
      stock =>
        stock.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [stocks, debouncedSearchTerm]);

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <Header username={username} email={email} onLogout={onLogout}/>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Market Overview</h1>
            <p className="text-gray-400 mt-1">Track the latest movements in the stock market.</p>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or ticker..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="block w-full bg-gray-800/70 border border-gray-700 rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredStocks.map(stock => (
              <Link to={`/stock/${stock.ticker}`} key={stock.ticker} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
                <StockCard stock={stock} />
              </Link>
            ))}
          </div>
        </main>
        <About />
      </div>
    </div>
  );
};

export default StocksPage;