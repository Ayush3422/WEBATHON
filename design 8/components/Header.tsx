import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    username: string | null;
    email: string | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, email, onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/stocks" className="text-2xl font-bold text-white tracking-tighter">
              MarketSim
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/stocks" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">Home</Link>
              <Link to="/stocks" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">Stocks</Link>
              <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">About</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {username && (
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-300">
                  Hi, {username}
                </span>
                {email && (
                  <span className="text-xs text-gray-400 -mt-1">{email}</span>
                )}
              </div>
            )}
            <button 
              onClick={onLogout}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;