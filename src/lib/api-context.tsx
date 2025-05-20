import { createContext, useContext, useState, ReactNode } from 'react';
import { Asset, Prediction, HistoricalPrediction, MultiTimeframePredictions, ConfluenceScore, PerformanceSummary } from '../lib/types';

// Define the API context type
interface ApiContextType {
  // Assets
  assets: Asset[];
  loadingAssets: boolean;
  fetchAssets: () => Promise<void>;
  
  // Current predictions
  currentPredictions: Record<string, Prediction>;
  loadingCurrentPredictions: boolean;
  fetchCurrentPredictions: () => Promise<void>;
  
  // Asset-specific prediction
  assetPrediction: Prediction | null;
  loadingAssetPrediction: boolean;
  fetchAssetPrediction: (assetId: string) => Promise<void>;
  
  // Historical predictions
  historicalPredictions: HistoricalPrediction[];
  loadingHistoricalPredictions: boolean;
  fetchHistoricalPredictions: (assetId: string, days?: number) => Promise<void>;
  
  // Multi-timeframe analysis
  multiTimeframePredictions: MultiTimeframePredictions;
  confluenceScore: ConfluenceScore | null;
  loadingMultiTimeframe: boolean;
  fetchMultiTimeframeAnalysis: (assetId: string) => Promise<void>;
  
  // Feedback
  submitFeedback: (assetId: string, predictionDate: string, helpful: boolean) => Promise<void>;
  
  // Performance
  performanceSummary: PerformanceSummary | null;
  loadingPerformance: boolean;
  fetchPerformanceSummary: () => Promise<void>;
  
  // Chart data
  chartData: any[];
  loadingChartData: boolean;
  fetchChartData: (assetId: string, timeframe?: string) => Promise<void>;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Sample data for development
const sampleAssets: Asset[] = [
  { id: 'XAUUSD', name: 'Gold', symbol: 'XAUUSD=X', assetClass: 'metals' },
  { id: 'XAGUSD', name: 'Silver', symbol: 'XAGUSD=X', assetClass: 'metals' },
  { id: 'EURUSD', name: 'Euro/USD', symbol: 'EURUSD=X', assetClass: 'forex' },
  { id: 'GBPUSD', name: 'GBP/USD', symbol: 'GBPUSD=X', assetClass: 'forex' },
  { id: 'BTCUSD', name: 'Bitcoin/USD', symbol: 'BTC-USD', assetClass: 'crypto' },
];

const samplePrediction: Prediction = {
  direction: 'Bullish',
  confidence: 78,
  confidenceTier: 'medium',
  pattern: 'Bullish Engulfing',
  date: '2025-05-16',
  assetId: 'XAUUSD',
};

const sampleMultiTimeframePredictions: MultiTimeframePredictions = {
  'daily': {
    direction: 'Bullish',
    confidence: 78,
    confidenceTier: 'medium',
    pattern: 'Bullish Engulfing',
    date: '2025-05-16 00:00:00'
  },
  '4h': {
    direction: 'Bullish',
    confidence: 82,
    confidenceTier: 'high',
    pattern: 'Inside Bar',
    date: '2025-05-16 12:00:00'
  },
  '1h': {
    direction: 'Neutral',
    confidence: 55,
    confidenceTier: 'low',
    pattern: 'Doji',
    date: '2025-05-16 13:00:00'
  },
  '15m': {
    direction: 'Bearish',
    confidence: 68,
    confidenceTier: 'medium',
    pattern: 'Bearish Pin Bar',
    date: '2025-05-16 13:15:00'
  }
};

const sampleConfluenceScore: ConfluenceScore = {
  bullish: 50,
  bearish: 25,
  neutral: 25,
  weighted: 35
};

// Provider component
interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  // State for assets
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(false);
  
  // State for current predictions
  const [currentPredictions, setCurrentPredictions] = useState<Record<string, Prediction>>({});
  const [loadingCurrentPredictions, setLoadingCurrentPredictions] = useState<boolean>(false);
  
  // State for asset-specific prediction
  const [assetPrediction, setAssetPrediction] = useState<Prediction | null>(null);
  const [loadingAssetPrediction, setLoadingAssetPrediction] = useState<boolean>(false);
  
  // State for historical predictions
  const [historicalPredictions, setHistoricalPredictions] = useState<HistoricalPrediction[]>([]);
  const [loadingHistoricalPredictions, setLoadingHistoricalPredictions] = useState<boolean>(false);
  
  // State for multi-timeframe analysis
  const [multiTimeframePredictions, setMultiTimeframePredictions] = useState<MultiTimeframePredictions>({});
  const [confluenceScore, setConfluenceScore] = useState<ConfluenceScore | null>(null);
  const [loadingMultiTimeframe, setLoadingMultiTimeframe] = useState<boolean>(false);
  
  // State for performance
  const [performanceSummary, setPerformanceSummary] = useState<PerformanceSummary | null>(null);
  const [loadingPerformance, setLoadingPerformance] = useState<boolean>(false);
  
  // State for chart data
  const [chartData, setChartData] = useState<any[]>([]);
  const [loadingChartData, setLoadingChartData] = useState<boolean>(false);
  
  // Fetch assets
  const fetchAssets = async () => {
    setLoadingAssets(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setAssets(sampleAssets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoadingAssets(false);
    }
  };
  
  // Fetch current predictions
  const fetchCurrentPredictions = async () => {
    setLoadingCurrentPredictions(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const predictions: Record<string, Prediction> = {};
      sampleAssets.forEach(asset => {
        predictions[asset.id] = {
          ...samplePrediction,
          assetId: asset.id,
          confidence: Math.floor(Math.random() * 30) + 60, // Random confidence between 60-90
          confidenceTier: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
          direction: Math.random() > 0.6 ? 'Bullish' : Math.random() > 0.5 ? 'Bearish' : 'Neutral',
        };
      });
      
      setCurrentPredictions(predictions);
    } catch (error) {
      console.error('Error fetching current predictions:', error);
    } finally {
      setLoadingCurrentPredictions(false);
    }
  };
  
  // Fetch asset-specific prediction
  const fetchAssetPrediction = async (assetId: string) => {
    setLoadingAssetPrediction(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setAssetPrediction({
        ...samplePrediction,
        assetId,
      });
    } catch (error) {
      console.error(`Error fetching prediction for ${assetId}:`, error);
    } finally {
      setLoadingAssetPrediction(false);
    }
  };
  
  // Fetch historical predictions
  const fetchHistoricalPredictions = async (assetId: string, days = 30) => {
    setLoadingHistoricalPredictions(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const predictions: HistoricalPrediction[] = [];
      
      // Generate sample historical predictions
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const correct = Math.random() > 0.3; // 70% correct predictions
        
        predictions.push({
          assetId,
          date: date.toISOString().split('T')[0],
          direction: Math.random() > 0.6 ? 'Bullish' : Math.random() > 0.5 ? 'Bearish' : 'Neutral',
          confidence: Math.floor(Math.random() * 30) + 60,
          confidenceTier: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
          pattern: Math.random() > 0.5 ? 'Bullish Engulfing' : 'Bearish Pin Bar',
          actualDirection: correct 
            ? (Math.random() > 0.6 ? 'Bullish' : Math.random() > 0.5 ? 'Bearish' : 'Neutral')
            : 'Neutral',
          correct,
        });
      }
      
      setHistoricalPredictions(predictions);
    } catch (error) {
      console.error(`Error fetching historical predictions for ${assetId}:`, error);
    } finally {
      setLoadingHistoricalPredictions(false);
    }
  };
  
  // Fetch multi-timeframe analysis
  const fetchMultiTimeframeAnalysis = async (assetId: string) => {
    setLoadingMultiTimeframe(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setMultiTimeframePredictions(sampleMultiTimeframePredictions);
      setConfluenceScore(sampleConfluenceScore);
    } catch (error) {
      console.error(`Error fetching multi-timeframe analysis for ${assetId}:`, error);
    } finally {
      setLoadingMultiTimeframe(false);
    }
  };
  
  // Submit feedback
  const submitFeedback = async (assetId: string, predictionDate: string, helpful: boolean) => {
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Feedback submitted for ${assetId} on ${predictionDate}: ${helpful ? 'Helpful' : 'Not helpful'}`);
      
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  };
  
  // Fetch performance summary
  const fetchPerformanceSummary = async () => {
    setLoadingPerformance(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const summary: PerformanceSummary = {
        overall: {
          winRate: 68,
          totalPredictions: 120,
          correctPredictions: 82,
        },
        byConfidence: {
          high: {
            winRate: 85,
            totalPredictions: 40,
            correctPredictions: 34,
          },
          medium: {
            winRate: 65,
            totalPredictions: 60,
            correctPredictions: 39,
          },
          low: {
            winRate: 45,
            totalPredictions: 20,
            correctPredictions: 9,
          },
        },
        byAsset: {
          'XAUUSD': {
            winRate: 75,
            totalPredictions: 40,
            correctPredictions: 30,
          },
          'XAGUSD': {
            winRate: 70,
            totalPredictions: 20,
            correctPredictions: 14,
          },
          'EURUSD': {
            winRate: 65,
            totalPredictions: 30,
            correctPredictions: 19.5,
          },
          'GBPUSD': {
            winRate: 60,
            totalPredictions: 15,
            correctPredictions: 9,
          },
          'BTCUSD': {
            winRate: 55,
            totalPredictions: 15,
            correctPredictions: 8.25,
          },
        },
      };
      
      setPerformanceSummary(summary);
    } catch (error) {
      console.error('Error fetching performance summary:', error);
    } finally {
      setLoadingPerformance(false);
    }
  };
  
  // Fetch chart data
  const fetchChartData = async (assetId: string, timeframe = 'daily') => {
    setLoadingChartData(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate sample chart data
      const data = [];
      const days = timeframe === 'daily' ? 90 : 
                  timeframe === '4h' ? 30 : 
                  timeframe === '1h' ? 7 : 2;
      
      const intervals = timeframe === 'daily' ? 1 : 
                       timeframe === '4h' ? 6 : 
                       timeframe === '1h' ? 24 : 96;
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      let price = assetId === 'XAUUSD' ? 2000 : 
                 assetId === 'XAGUSD' ? 25 : 
                 assetId === 'EURUSD' ? 1.1 : 
                 assetId === 'GBPUSD' ? 1.3 : 
                 assetId === 'BTCUSD' ? 60000 : 100;
      
      for (let i = 0; i < days * intervals; i++) {
        const date = new Date(startDate);
        
        if (timeframe === 'daily') {
          date.setDate(date.getDate() + i);
        } else if (timeframe === '4h') {
          date.setHours(date.getHours() + (i * 4));
        } else if (timeframe === '1h') {
          date.setHours(date.getHours() + i);
        } else {
          date.setMinutes(date.getMinutes() + (i * 15));
        }
        
        // Random price movement
        const change = (Math.random() - 0.5) * 0.02 * price;
        price += change;
        
        const open = price;
        const close = price + (Math.random() - 0.5) * 0.01 * price;
        const high = Math.max(open, close) + Math.random() * 0.005 * price;
        const low = Math.min(open, close) - Math.random() * 0.005 * price;
        const volume = Math.floor(Math.random() * 1000) + 500;
        
        data.push({
          datetime: date.toISOString(),
          open,
          high,
          low,
          close,
          volume,
        });
      }
      
      setChartData(data);
    } catch (error) {
      console.error(`Error fetching chart data for ${assetId}:`, error);
    } finally {
      setLoadingChartData(false);
    }
  };
  
  return (
    <ApiContext.Provider
      value={{
        // Assets
        assets,
        loadingAssets,
        fetchAssets,
        
        // Current predictions
        currentPredictions,
        loadingCurrentPredictions,
        fetchCurrentPredictions,
        
        // Asset-specific prediction
        assetPrediction,
        loadingAssetPrediction,
        fetchAssetPrediction,
        
        // Historical predictions
        historicalPredictions,
        loadingHistoricalPredictions,
        fetchHistoricalPredictions,
        
        // Multi-timeframe analysis
        multiTimeframePredictions,
        confluenceScore,
        loadingMultiTimeframe,
        fetchMultiTimeframeAnalysis,
        
        // Feedback
        submitFeedback,
        
        // Performance
        performanceSummary,
        loadingPerformance,
        fetchPerformanceSummary,
        
        // Chart data
        chartData,
        loadingChartData,
        fetchChartData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  
  return context;
};
