import React from 'react';

// This is a simple API test component to verify backend connectivity
const ApiTest: React.FC = () => {
  const [health, setHealth] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/health`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setHealth(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">API Connection Test</h2>
      
      {loading && <p>Testing connection to backend API...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Connection Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {health && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Connection Successful!</p>
          <p>Status: {health.status}</p>
          <p>Message: {health.message}</p>
          <p className="mt-2">API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
