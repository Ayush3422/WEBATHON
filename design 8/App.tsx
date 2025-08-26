import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StocksPage from './pages/StocksPage';
import StockDetailPage from './pages/StockDetailPage';
import { useStockPrices } from './hooks/useStockPrices';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const stocks = useStockPrices();

  useEffect(() => {
    const password = localStorage.getItem('stock_sim_password');
    const storedUsername = localStorage.getItem('stock_sim_username');

    if (password && storedUsername) {
      // User is authenticated
      if (!isAuthenticated) {
        const storedEmail = localStorage.getItem('stock_sim_email');
        setIsAuthenticated(true);
        setUsername(storedUsername);
        setEmail(storedEmail);
      }
      // If authenticated user is on the login page, redirect them
      if (location.pathname === '/') {
        navigate('/stocks');
      }
    } else {
      // User is not authenticated
      if (isAuthenticated) {
        setIsAuthenticated(false);
        setUsername(null);
        setEmail(null);
      }
      // If unauthenticated user is on a protected page, redirect them
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  }, [location.pathname, isAuthenticated, navigate]);

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('stock_sim_username');
    const storedEmail = localStorage.getItem('stock_sim_email');
    setIsAuthenticated(true);
    setUsername(storedUsername);
    setEmail(storedEmail);
    navigate('/stocks');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('stock_sim_password');
    localStorage.removeItem('stock_sim_username');
    localStorage.removeItem('stock_sim_email');
    setIsAuthenticated(false);
    setUsername(null);
    setEmail(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route 
          path="/stocks" 
          element={
            isAuthenticated ? <StocksPage username={username} email={email} onLogout={handleLogout} stocks={stocks} /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/stock/:ticker"
          element={
            isAuthenticated ? <StockDetailPage username={username} email={email} onLogout={handleLogout} stocks={stocks} /> : <LoginPage onLogin={handleLogin} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;