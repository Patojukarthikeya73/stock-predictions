import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebaseConfig'; // Firebase configuration
import Navbar from './components/Navbar'; // Navbar component
import { LineChart } from 'lucide-react';
import { StockQuoteCard } from './components/StockQuote'; // StockQuote component
import { NewsCard } from './components/NewsCard'; // NewsCard component
import { SearchBar } from './components/SearchBar'; // SearchBar component
import { MarketOverview } from './components/MarketOverview'; // MarketOverview component
import { getStockQuote, getMarketNews } from './utils/api'; // API utility functions
import { StockQuote, NewsItem } from './types/finnhub'; // Types for StockQuote and NewsItem

// Default stocks for the watchlist
const DEFAULT_STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

function App() {
  const [user, setUser] = useState<any>(null);  // Store Firebase user
  const [watchedStocks, setWatchedStocks] = useState<string[]>(DEFAULT_STOCKS);  // Watched stocks
  const [quotes, setQuotes] = useState<Record<string, StockQuote>>({});  // Stock quotes
  const [news, setNews] = useState<NewsItem[]>([]);  // Market news
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  // Listen for Firebase auth state changes and update user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Update user state when authenticated
      } else {
        setUser(null);  // If not authenticated, set user to null
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Fetch stock quotes and news for watched stocks every 10 seconds
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch stock quotes for the watched stocks
        const quotesData = await Promise.all(
          watchedStocks.map(async (symbol) => {
            const quote = await getStockQuote(symbol);
            return [symbol, quote];
          })
        );
        setQuotes(Object.fromEntries(quotesData));

        // Fetch latest market news
        const newsData = await getMarketNews();
        setNews(newsData.slice(0, 6)); // Limit to first 6 news items
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [watchedStocks]);

  // Handle adding a stock to the watchlist
  const handleSearch = async (symbol: string) => {
    if (watchedStocks.includes(symbol)) {
      setError('This stock is already in your watchlist');
      return;
    }

    setLoading(true);
    try {
      const quote = await getStockQuote(symbol);
      if (quote.c === 0 && quote.h === 0 && quote.l === 0) {
        throw new Error('Invalid stock symbol');
      }
      setWatchedStocks([...watchedStocks, symbol]);
      setQuotes({ ...quotes, [symbol]: quote });
      setError(null);
    } catch (error) {
      setError('Invalid stock symbol or API error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle removing a stock from the watchlist
  const removeStock = (symbolToRemove: string) => {
    if (watchedStocks.length <= 1) {
      setError('You must keep at least one stock in your watchlist');
      return;
    }
    setWatchedStocks(watchedStocks.filter(symbol => symbol !== symbolToRemove));
    const newQuotes = { ...quotes };
    delete newQuotes[symbolToRemove];
    setQuotes(newQuotes);
  };

  // Loading state UI
  if (loading && Object.keys(quotes).length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin">
          <LineChart className="w-8 h-8 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Pass user as prop to Navbar */}
      <Navbar user={user} onLogin={setUser} />  

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Stock Market Dashboard</h1>
              <p className="text-gray-600 mt-2">Real-time market insights at your fingertips</p>
            </div>
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          
          <MarketOverview quotes={quotes} />
        </header>

        <main className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Watched Stocks</h2>
              <span className="text-sm text-gray-500">
                Auto-updates every 10 seconds
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchedStocks.map((symbol) => (
                <StockQuoteCard
                  key={symbol}
                  symbol={symbol}
                  quote={quotes[symbol]}
                  onRemove={() => removeStock(symbol)} // Pass removeStock function
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Market News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
