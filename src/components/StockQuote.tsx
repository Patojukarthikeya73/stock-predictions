import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, X, DollarSign, Clock, Activity } from 'lucide-react';
import type { StockQuote } from '../types/finnhub';
import { StockChart } from './StockChart';
import { PriceAlerts } from './PriceAlerts';
import { TechnicalIndicators } from './TechnicalIndicators';
import { VolumeAnalysis } from './VolumeAnalysis';
import { StockVisualization } from './StockVisualization';

interface Props {
  symbol: string;
  quote: StockQuote;
  onRemove: () => void;
}

export function StockQuoteCard({ symbol, quote, onRemove }: Props) {
  const [showVisualization, setShowVisualization] = useState(false);
  const priceChange = quote.c - quote.pc;
  const percentageChange = (priceChange / quote.pc) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 relative group transform transition-all duration-300 hover:scale-102 hover:shadow-lg"
      onMouseEnter={() => setShowVisualization(true)}
      onMouseLeave={() => setShowVisualization(false)}
    >
      <StockVisualization quote={quote} isVisible={showVisualization} />
      
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-300"
        title="Remove from watchlist"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {symbol}
            {isPositive ? (
              <ArrowUpCircle className="w-6 h-6 text-green-500" />
            ) : (
              <ArrowDownCircle className="w-6 h-6 text-red-500" />
            )}
          </h2>
          <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Current</p>
              <p className="text-xl font-semibold">${quote.c.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Change</p>
              <p className={`text-xl font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentageChange.toFixed(2)}%)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Range</p>
              <p className="text-xl font-semibold">${quote.l.toFixed(2)} - ${quote.h.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <StockChart symbol={symbol} quote={quote} />
        <TechnicalIndicators quote={quote} />
        <PriceAlerts symbol={symbol} quote={quote} />
        <VolumeAnalysis quote={quote} />
      </div>
    </div>
  );
}