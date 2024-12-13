import React from 'react';
import { Gauge, Activity, DollarSign, TrendingUp } from 'lucide-react';
import type { StockQuote } from '../types/finnhub';

interface Props {
  quotes: Record<string, StockQuote>;
}

export function MarketOverview({ quotes }: Props) {
  const calculateMarketStats = () => {
    const stocks = Object.values(quotes);
    if (!stocks.length) return { gainers: 0, losers: 0, avgChange: 0 };
    
    const changes = stocks.map(quote => ((quote.c - quote.pc) / quote.pc) * 100);
    const gainers = changes.filter(change => change > 0).length;
    const avgChange = changes.reduce((acc, curr) => acc + curr, 0) / changes.length;
    
    return { gainers, losers: stocks.length - gainers, avgChange };
  };

  const stats = calculateMarketStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <Activity className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Market Activity</p>
          <p className="text-xl font-semibold">{Object.keys(quotes).length} Stocks</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
        <div className="p-3 bg-green-100 rounded-full">
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Gainers</p>
          <p className="text-xl font-semibold">{stats.gainers}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
        <div className="p-3 bg-red-100 rounded-full">
          <Gauge className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Losers</p>
          <p className="text-xl font-semibold">{stats.losers}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
        <div className="p-3 bg-purple-100 rounded-full">
          <DollarSign className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Change</p>
          <p className="text-xl font-semibold">
            {stats.avgChange > 0 ? '+' : ''}{stats.avgChange.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}