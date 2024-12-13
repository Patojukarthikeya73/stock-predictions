import React from 'react';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import type { StockQuote } from '../types/finnhub';

interface Props {
  quote: StockQuote;
}

export function VolumeAnalysis({ quote }: Props) {
  // Calculate volume profile (simplified)
  const volumeProfile = {
    trend: quote.c > quote.pc ? 'up' : 'down',
    strength: Math.abs((quote.c - quote.pc) / quote.pc) * 100,
    signal: getVolumeSignal(quote),
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium">Volume Analysis</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Volume Trend</span>
          <div className="flex items-center gap-2">
            {volumeProfile.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              volumeProfile.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {volumeProfile.trend === 'up' ? 'Increasing' : 'Decreasing'}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Strength</span>
            <span className="text-sm font-medium">{volumeProfile.strength.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                volumeProfile.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, volumeProfile.strength)}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg">
          <span className="text-sm text-gray-600 block mb-1">Signal</span>
          <span className={`font-medium ${getSignalColor(volumeProfile.signal)}`}>
            {volumeProfile.signal}
          </span>
        </div>
      </div>
    </div>
  );
}

function getVolumeSignal(quote: StockQuote): string {
  const priceChange = quote.c - quote.pc;
  const changePercent = Math.abs(priceChange / quote.pc);
  
  if (changePercent > 0.02) {
    return priceChange > 0 ? 'Strong Buy' : 'Strong Sell';
  } else if (changePercent > 0.01) {
    return priceChange > 0 ? 'Buy' : 'Sell';
  }
  return 'Hold';
}

function getSignalColor(signal: string): string {
  switch (signal) {
    case 'Strong Buy':
      return 'text-green-600';
    case 'Buy':
      return 'text-green-500';
    case 'Strong Sell':
      return 'text-red-600';
    case 'Sell':
      return 'text-red-500';
    default:
      return 'text-yellow-500';
  }
}