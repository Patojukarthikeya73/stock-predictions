import React, { useState } from 'react';
import { Bell, BellOff, AlertTriangle } from 'lucide-react';
import type { StockQuote } from '../types/finnhub';

interface Alert {
  symbol: string;
  price: number;
  type: 'above' | 'below';
}

interface Props {
  symbol: string;
  quote: StockQuote;
}

export function PriceAlerts({ symbol, quote }: Props) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlert, setNewAlert] = useState({ price: quote.c, type: 'above' as const });

  const addAlert = () => {
    setAlerts([...alerts, { symbol, ...newAlert }]);
  };

  const removeAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium">Price Alerts</h3>
      </div>

      <div className="flex gap-2 mb-4">
        <select
          value={newAlert.type}
          onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value as 'above' | 'below' })}
          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <input
          type="number"
          value={newAlert.price}
          onChange={(e) => setNewAlert({ ...newAlert, price: parseFloat(e.target.value) })}
          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          step="0.01"
        />
        <button
          onClick={addAlert}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Alert
        </button>
      </div>

      {alerts.length > 0 ? (
        <ul className="space-y-2">
          {alerts.map((alert, index) => (
            <li key={index} className="flex items-center justify-between bg-white p-2 rounded">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span>Alert when price goes {alert.type} ${alert.price}</span>
              </div>
              <button
                onClick={() => removeAlert(index)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <BellOff className="w-4 h-4 text-gray-500" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No alerts set</p>
      )}
    </div>
  );
}