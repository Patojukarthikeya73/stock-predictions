import React from 'react';
import { LineChart as LineChartIcon, TrendingUp, TrendingDown } from 'lucide-react';
import type { StockQuote } from '../types/finnhub';

interface Props {
  symbol: string;
  quote: StockQuote;
}

export function StockChart({ symbol, quote }: Props) {
  const priceChange = quote.c - quote.pc;
  const percentageChange = (priceChange / quote.pc) * 100;
  const isPositive = priceChange >= 0;

  // Calculate market sentiment score (simple algorithm)
  const sentimentScore = ((quote.c - quote.l) / (quote.h - quote.l)) * 100;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-gray-600">Market Sentiment</span>
        </div>
        {isPositive ? (
          <TrendingUp className="w-5 h-5 text-green-500" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-500" />
        )}
      </div>
      
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${
            sentimentScore > 66 ? 'bg-green-500' : 
            sentimentScore > 33 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${Math.max(5, Math.min(95, sentimentScore))}%` }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>Bearish</span>
        <span>Neutral</span>
        <span>Bullish</span>
      </div>
    </div>
  );
}