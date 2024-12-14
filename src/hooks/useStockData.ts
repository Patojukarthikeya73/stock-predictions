import { useState, useEffect } from 'react';
import axios from 'axios'; // Or any HTTP client of your choice

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const useStockData = (symbol: string) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchStockData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your stock data API endpoint
        const response = await axios.get(`https://api.example.com/stocks/${symbol}`);
        const data = response.data;

        setStockData({
          symbol: data.symbol,
          price: data.price,
          change: data.change,
          changePercent: data.changePercent,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  return { stockData, loading, error };
};

export default useStockData;
