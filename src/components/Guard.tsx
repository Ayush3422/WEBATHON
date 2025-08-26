import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppState';

interface GuardProps {
  children: React.ReactNode;
}

const Guard: React.FC<GuardProps> = ({ children }) => {
  const { state } = useApp();
  
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default Guard;