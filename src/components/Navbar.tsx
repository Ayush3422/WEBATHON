import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppState';
import { Sun, Moon, LogOut, Zap } from 'lucide-react';

const Navbar = () => {
  const { state, dispatch } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <motion.nav 
      className="nav glass"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="logo">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-6 h-6 text-accent" />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-bold">
            Future Finance
          </span>
        </motion.div>
      </Link>

      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        {state.user && (
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        {!state.user ? (
          <>
            <li className={location.pathname === '/login' ? 'active' : ''}>
              <Link to="/login">Login</Link>
            </li>
            <li className={location.pathname === '/signup' ? 'active' : ''}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        ) : (
          <li>
            <motion.button 
              onClick={handleLogout}
              className="link flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </li>
        )}
      </ul>

      <motion.button 
        onClick={toggleTheme}
        className="toggle flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {state.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;