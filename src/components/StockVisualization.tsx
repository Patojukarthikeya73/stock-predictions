import React from 'react';
import type { StockQuote } from '../types/finnhub';

interface Props {
  quote: StockQuote;
  isVisible: boolean;
}

export function StockVisualization({ quote, isVisible }: Props) {
  if (!isVisible) return null;

  const maxPrice = Math.max(quote.h, quote.c, quote.o, quote.pc);
  const minPrice = Math.min(quote.l, quote.c, quote.o, quote.pc);
  const range = maxPrice - minPrice;
  
  const getHeight = (price: number) => {
    return ((price - minPrice) / range) * 100;
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-white/95 rounded-xl p-6 shadow-lg transform transition-all duration-300 z-10">
      <h3 className="text-lg font-semibold mb-4">Price Distribution</h3>
      
      <div className="relative h-48 flex items-end justify-around">
        {/* Opening Price Bar */}
        <div className="relative w-12 group">
          <div
            className="w-full bg-blue-400 rounded-t transition-all duration-500"
            style={{ height: `${getHeight(quote.o)}%` }}
          />
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded text-sm">
            Open: ${quote.o.toFixed(2)}
          </div>
          <span className="text-xs text-gray-500 mt-1 block text-center">Open</span>
        </div>

        {/* Current Price Bar */}
        <div className="relative w-12 group">
          <div
            className="w-full bg-green-400 rounded-t transition-all duration-500"
            style={{ height: `${getHeight(quote.c)}%` }}
          />
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded text-sm">
            Current: ${quote.c.toFixed(2)}
          </div>
          <span className="text-xs text-gray-500 mt-1 block text-center">Current</span>
        </div>

        {/* Previous Close Bar */}
        <div className="relative w-12 group">
          <div
            className="w-full bg-purple-400 rounded-t transition-all duration-500"
            style={{ height: `${getHeight(quote.pc)}%` }}
          />
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded text-sm">
            Prev Close: ${quote.pc.toFixed(2)}
          </div>
          <span className="text-xs text-gray-500 mt-1 block text-center">Prev Close</span>
        </div>
      </div>

      {/* Price Range Indicator */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Day Range</span>
          <span className="text-sm font-medium">${quote.l.toFixed(2)} - ${quote.h.toFixed(2)}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{
              left: `${((quote.c - quote.l) / (quote.h - quote.l)) * 100}%`,
              width: '4px',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}