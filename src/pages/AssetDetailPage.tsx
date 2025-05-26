import React from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useMocks';

const AssetDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const api = useApi();
  const [asset, setAsset] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

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
          name: 'Bitcoin',
          price: 50000,
          change24h: 2.5
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
        <h1 className="text-2xl font-bold">{asset.name} ({asset.symbol})</h1>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">${asset.price.toLocaleString()}</span>
          <span className={`text-lg ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Asset Information</h3>
            <p className="text-sm text-muted-foreground">
              This is a placeholder for detailed information about {asset.name}.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Trading History</h3>
            <p className="text-sm text-muted-foreground">
              Trading history will be displayed here when connected to the backend API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
