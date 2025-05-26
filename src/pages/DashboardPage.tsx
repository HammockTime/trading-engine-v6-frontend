import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useMocks';

const DashboardPage: React.FC = () => {
  const api = useApi();
  const [assets, setAssets] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get('/assets');
        setAssets(response.data || []);
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [api]);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading assets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Refresh Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Market Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Total Market Cap</span>
              <span className="font-medium">$1.25T</span>
            </div>
            <div className="flex justify-between items-center">
              <span>24h Volume</span>
              <span className="font-medium">$48.2B</span>
            </div>
            <div className="flex justify-between items-center">
              <span>BTC Dominance</span>
              <span className="font-medium">42.3%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Portfolio Value</h2>
          <div className="text-2xl font-bold">$12,450.83</div>
          <div className="text-green-500">+2.4% (24h)</div>
          <button className="mt-4 text-primary hover:underline">View Details</button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Active Alerts</h2>
          <div className="space-y-2">
            <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
              BTC above $50,000
            </div>
            <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
              ETH below $3,100
            </div>
          </div>
          <button className="mt-4 text-primary hover:underline">Manage Alerts</button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Top Cryptocurrencies</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${asset.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${asset.change24h >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/asset/${asset.symbol}`} className="text-primary hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <div className="space-y-2">
            <div className="p-2 border-b">
              <div className="flex justify-between">
                <span>Buy BTC</span>
                <span className="text-green-500">+0.05 BTC</span>
              </div>
              <div className="text-sm text-gray-500">May 25, 2025</div>
            </div>
            <div className="p-2 border-b">
              <div className="flex justify-between">
                <span>Sell ETH</span>
                <span className="text-red-500">-2.5 ETH</span>
              </div>
              <div className="text-sm text-gray-500">May 24, 2025</div>
            </div>
          </div>
          <button className="mt-4 text-primary hover:underline">View All</button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Trading Recommendations</h2>
          <div className="space-y-2">
            <div className="p-2 border-b">
              <div className="font-medium">BTC: Buy Signal</div>
              <div className="text-sm text-gray-500">RSI indicates oversold conditions</div>
            </div>
            <div className="p-2 border-b">
              <div className="font-medium">SOL: Strong Buy</div>
              <div className="text-sm text-gray-500">MACD crossover detected</div>
            </div>
          </div>
          <button className="mt-4 text-primary hover:underline">View All</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
