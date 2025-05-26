import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useMocks';

const AssetDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const api = useApi();
  const [asset, setAsset] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [timeframe, setTimeframe] = React.useState('1d');

  React.useEffect(() => {
    const fetchAsset = async () => {
      try {
        // In a real app, you would fetch the specific asset
        // For now, we'll use mock data
        const response = await api.get('/assets');
        const foundAsset = response.data.find((a: any) => 
          a.symbol.toLowerCase() === symbol?.toLowerCase()
        ) || {
          id: 1,
          symbol: symbol?.toUpperCase() || 'BTC',
          name: symbol === 'BTC' ? 'Bitcoin' : symbol === 'ETH' ? 'Ethereum' : 'Solana',
          price: symbol === 'BTC' ? 50000 : symbol === 'ETH' ? 3000 : 100,
          change24h: symbol === 'BTC' ? 2.5 : symbol === 'ETH' ? 1.8 : 3.2,
          marketCap: symbol === 'BTC' ? '950B' : symbol === 'ETH' ? '350B' : '45B',
          volume24h: symbol === 'BTC' ? '25B' : symbol === 'ETH' ? '15B' : '3B',
          circulatingSupply: symbol === 'BTC' ? '19M' : symbol === 'ETH' ? '120M' : '450M',
        };
        
        setAsset(foundAsset);
      } catch (error) {
        console.error('Error fetching asset:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [api, symbol]);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading asset details...</div>;
  }

  if (!asset) {
    return <div className="flex items-center justify-center h-full">Asset not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{asset.name} ({asset.symbol})</h1>
            <span className={`px-2 py-1 text-sm rounded-full ${asset.change24h >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
            </span>
          </div>
          <p className="text-gray-500">Last updated: May 26, 2025, 11:45 PM</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Buy
          </button>
          <button className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Sell
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold">${asset.price.toLocaleString()}</span>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded ${timeframe === '1h' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeframe('1h')}
            >
              1H
            </button>
            <button 
              className={`px-3 py-1 rounded ${timeframe === '1d' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeframe('1d')}
            >
              1D
            </button>
            <button 
              className={`px-3 py-1 rounded ${timeframe === '1w' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeframe('1w')}
            >
              1W
            </button>
            <button 
              className={`px-3 py-1 rounded ${timeframe === '1m' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeframe('1m')}
            >
              1M
            </button>
          </div>
        </div>
        
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center mb-4">
          <p className="text-gray-500">Price chart will be displayed here</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-500">Market Cap</div>
            <div className="font-medium">{asset.marketCap}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">24h Volume</div>
            <div className="font-medium">{asset.volume24h}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Circulating Supply</div>
            <div className="font-medium">{asset.circulatingSupply}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">All-Time High</div>
            <div className="font-medium">${(asset.price * 1.5).toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Technical Analysis</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">RSI (14)</h3>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Oversold</span>
                <span>65</span>
                <span>Overbought</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">MACD</h3>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                <span>Bullish</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Moving Averages</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-medium">Buy</div>
                  <div className="text-sm">MA (50)</div>
                </div>
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-medium">Buy</div>
                  <div className="text-sm">MA (100)</div>
                </div>
                <div className="p-2 bg-red-100 rounded">
                  <div className="font-medium">Sell</div>
                  <div className="text-sm">MA (200)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Prediction Engine</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Price Prediction (24h)</h3>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                <span className="font-medium">${(asset.price * 1.03).toLocaleString()}</span>
                <span className="text-green-500">(+3%)</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Confidence Level</h3>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '75%' }}></div>
              </div>
              <div className="text-right text-sm mt-1">75%</div>
            </div>
            
            <div>
              <h3 className="font-medium">Sentiment Analysis</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-medium">Positive</div>
                  <div className="text-sm">65%</div>
                </div>
                <div className="p-2 bg-gray-100 rounded">
                  <div className="font-medium">Neutral</div>
                  <div className="text-sm">25%</div>
                </div>
                <div className="p-2 bg-red-100 rounded">
                  <div className="font-medium">Negative</div>
                  <div className="text-sm">10%</div>
                </div>
              </div>
            </div>
            
            <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              View Detailed Analysis
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent News</h2>
        <div className="space-y-4">
          <div className="p-4 border-b">
            <h3 className="font-medium">{asset.name} Reaches New Milestone in Adoption</h3>
            <p className="text-sm text-gray-500 mt-1">Major financial institution announces support for {asset.symbol}...</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">CryptoNews • 2 hours ago</span>
              <a href="#" className="text-primary text-sm hover:underline">Read More</a>
            </div>
          </div>
          
          <div className="p-4 border-b">
            <h3 className="font-medium">Technical Analysis: {asset.symbol} Poised for Breakout</h3>
            <p className="text-sm text-gray-500 mt-1">Key indicators suggest potential upward movement for {asset.name}...</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">TradingView • 5 hours ago</span>
              <a href="#" className="text-primary text-sm hover:underline">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
