import React, { useEffect, useState } from 'react';
import { useApi } from '@/lib/api-context';

interface HealthResponse {
  status: string;
  message: string;
}

const ApiTest: React.FC = () => {
  const api = useApi();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        setLoading(true);
        const response = await api.get<HealthResponse>('health');
        
        if (response.error) {
          setError(response.error);
        } else {
          setHealth(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkApiHealth();
  }, [api]);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">API Connection Test</h2>
      
      {loading && <p>Testing connection to backend API...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Connection Error</p>
          <p>{error}</p>
          <p className="mt-2">API URL: {api.baseUrl}</p>
        </div>
      )}
      
      {health && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Connection Successful!</p>
          <p>Status: {health.status}</p>
          <p>Message: {health.message}</p>
          <p className="mt-2">API URL: {api.baseUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
