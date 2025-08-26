import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-transparent border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
          About MarketSim
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          MarketSim is a dynamic and interactive stock market simulation platform designed for educational and entertainment purposes. It provides a risk-free environment to learn the basics of stock trading.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white">Live Simulation</h3>
            <p className="mt-2 text-gray-400">
              Experience a pseudo-live market with stock prices that update every few seconds, mimicking the volatility of the real world.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white">Modern Interface</h3>
            <p className="mt-2 text-gray-400">
              Built with a sleek, responsive, and dark-themed UI using modern web technologies like React, TypeScript, and Tailwind CSS.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white">Interactive Charts</h3>
            <p className="mt-2 text-gray-400">
              Each stock includes a sparkline chart that visualizes its recent price history, providing an at-a-glance performance overview.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;