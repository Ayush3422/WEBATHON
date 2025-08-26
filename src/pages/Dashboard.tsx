import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppState';
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign, Calendar, Filter } from 'lucide-react';

const Dashboard = () => {
  const { state, dispatch } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense'
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) return;

    const transaction = {
      id: Date.now().toString(),
      description: newTransaction.description,
      amount: newTransaction.type === 'expense' ? -Math.abs(Number(newTransaction.amount)) : Math.abs(Number(newTransaction.amount)),
      category: newTransaction.category,
      date: new Date().toISOString().split('T')[0],
      type: newTransaction.type
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    setNewTransaction({ description: '', amount: '', category: '', type: 'expense' });
    setShowAddForm(false);
  };

  const handleDeleteTransaction = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const totalIncome = state.transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(state.transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Welcome Header */}
      <motion.div 
        className="card glass p-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Welcome back, {state.user}!
        </h1>
        <p className="text-gray-400">Here's your financial overview</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="card glass p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ${state.balance.toLocaleString()}
          </h3>
          <p className="text-gray-400">Total Balance</p>
        </motion.div>

        <motion.div 
          className="card glass p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ${totalIncome.toLocaleString()}
          </h3>
          <p className="text-gray-400">Total Income</p>
        </motion.div>

        <motion.div 
          className="card glass p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-red-400 text-sm">-8%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ${totalExpenses.toLocaleString()}
          </h3>
          <p className="text-gray-400">Total Expenses</p>
        </motion.div>
      </div>

      {/* Transactions Section */}
      <motion.div 
        className="card glass p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
          <div className="flex gap-3">
            <motion.button 
              className="secondary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              Filter
            </motion.button>
            <motion.button 
              onClick={() => setShowAddForm(true)}
              className="primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </motion.button>
          </div>
        </div>

        {/* Add Transaction Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20"
            >
              <form onSubmit={handleAddTransaction} className="form">
                <input
                  type="text"
                  placeholder="Description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  required
                />
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'income' | 'expense'})}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <div className="flex gap-3">
                  <button type="submit" className="primary">Add Transaction</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="secondary">Cancel</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transactions List */}
        <div className="space-y-3">
          <AnimatePresence>
            {state.transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`list-item ${transaction.amount > 0 ? 'pos' : 'neg'}`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${transaction.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {transaction.amount > 0 ? 
                      <TrendingUp className="w-4 h-4 text-green-400" /> : 
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{transaction.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {transaction.date}
                </div>
                <div className={`text-lg font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </div>
                <motion.button
                  onClick={() => handleDeleteTransaction(transaction.id)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;