import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, BarChart3, Wallet, Target } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "AI-powered insights to optimize your spending patterns"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your financial data is protected with military-grade encryption"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Instant synchronization across all your devices"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Reports",
      description: "Comprehensive financial reports with predictive modeling"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Multi-Account Support",
      description: "Connect and manage all your financial accounts in one place"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Tracking",
      description: "Set and achieve your financial goals with smart recommendations"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section 
        className="hero glass relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"></div>
        <div className="relative z-10 text-center space-y-6">
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Future Finance
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Experience the next generation of financial management. Track, visualize, and optimize your spending with cutting-edge AI technology and stunning design.
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/signup">
              <motion.button 
                className="primary px-8 py-4 text-lg font-semibold"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,187,249,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button 
                className="secondary px-8 py-4 text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to take control of your financial future</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card glass p-6 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,187,249,0.15)"
              }}
            >
              <div className="text-cyan-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="card glass p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              1M+
            </motion.div>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div>
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              $50B+
            </motion.div>
            <p className="text-gray-400">Transactions Processed</p>
          </div>
          <div>
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              99.9%
            </motion.div>
            <p className="text-gray-400">Uptime Guarantee</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;