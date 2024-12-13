import React from 'react';
import { TrendingUp, ArrowRight, Activity } from 'lucide-react';
import type { StockQuote } from '../types/finnhub';

interface Props {
  quote: StockQuote;
}

export function TechnicalIndicators({ quote }: Props) {
  // Calculate simple technical indicators
  const rsi = calculateRSI(quote);
  const macd = calculateMACD(quote);
  const momentum = calculateMomentum(quote);

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium">Technical Indicators</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">RSI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{rsi.toFixed(2)}</span>
            <span className={`text-sm ${rsi > 70 ? 'text-red-500' : rsi < 30 ? 'text-green-500' : 'text-gray-500'}`}>
              {rsi > 70 ? 'Overbought' : rsi < 30 ? 'Oversold' : 'Neutral'}
            </span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">MACD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{macd.toFixed(2)}</span>
            <span className={`text-sm ${macd > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {macd > 0 ? 'Bullish' : 'Bearish'}
            </span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Momentum</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{momentum.toFixed(2)}%</span>
            <span className={`text-sm ${momentum > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {momentum > 0 ? 'Positive' : 'Negative'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple technical indicator calculations
function calculateRSI(quote: StockQuote): number {
  const change = quote.c - quote.pc;
  const gain = Math.max(change, 0);
  const loss = Math.max(-change, 0);
  
  // Simplified RSI calculation
  const rs = gain / (loss || 1);
  return 100 - (100 / (1 + rs));
}

function calculateMACD(quote: StockQuote): number {
  // Simplified MACD calculation
  const shortTerm = quote.c;
  const longTerm = quote.pc;
  return shortTerm - longTerm;
}

function calculateMomentum(quote: StockQuote): number {
  // Simple momentum calculation
  return ((quote.c - quote.pc) / quote.pc) * 100;
}