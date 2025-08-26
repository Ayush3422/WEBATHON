import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface AppState {
  user: string | null;
  theme: 'dark' | 'light';
  transactions: Transaction[];
  balance: number;
}

type AppAction = 
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string };

const initialState: AppState = {
  user: null,
  theme: 'dark',
  transactions: [
    { id: '1', description: 'Salary', amount: 5000, category: 'Income', date: '2024-01-15', type: 'income' },
    { id: '2', description: 'Groceries', amount: -150, category: 'Food', date: '2024-01-14', type: 'expense' },
    { id: '3', description: 'Gas', amount: -80, category: 'Transport', date: '2024-01-13', type: 'expense' },
    { id: '4', description: 'Freelance', amount: 800, category: 'Income', date: '2024-01-12', type: 'income' },
  ],
  balance: 5570
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        balance: state.balance + action.payload.amount
      };
    case 'DELETE_TRANSACTION':
      const transaction = state.transactions.find(t => t.id === action.payload);
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
        balance: transaction ? state.balance - transaction.amount : state.balance
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};