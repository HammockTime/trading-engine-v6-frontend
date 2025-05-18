// Type definitions for the application

// Authentication
export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Assets
export interface Asset {
  id: string;
  name: string;
  symbol: string;
  assetClass: 'metals' | 'forex' | 'crypto';
}

// Predictions
export type PredictionDirection = 'Bullish' | 'Bearish' | 'Neutral';
export type ConfidenceTier = 'high' | 'medium' | 'low';

export interface Prediction {
  direction: PredictionDirection;
  confidence: number;
  confidenceTier: ConfidenceTier;
  pattern: string;
  date: string;
  assetId: string;
}

export interface HistoricalPrediction extends Prediction {
  actualDirection?: PredictionDirection;
  correct?: boolean;
}

// Multi-timeframe
export type Timeframe = 'daily' | '4h' | '1h' | '15m';

export interface TimeframePrediction {
  direction: PredictionDirection;
  confidence: number;
  confidenceTier: ConfidenceTier;
  pattern: string;
  date: string;
}

export interface MultiTimeframePredictions {
  [timeframe: string]: TimeframePrediction;
}

export interface ConfluenceScore {
  bullish: number;
  bearish: number;
  neutral: number;
  weighted: number;
}

// Chart data
export interface CandleData {
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

// Feedback
export interface FeedbackStats {
  helpfulCount: number;
  notHelpfulCount: number;
  totalVotes: number;
}

// Performance
export interface PerformanceMetrics {
  winRate: number;
  totalPredictions: number;
  correctPredictions: number;
}

export interface PerformanceSummary {
  overall: PerformanceMetrics;
  byConfidence: {
    high: PerformanceMetrics;
    medium: PerformanceMetrics;
    low: PerformanceMetrics;
  };
  byAsset: {
    [assetId: string]: PerformanceMetrics;
  };
}

// User preferences
export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface DisplayPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultTimeframe: Timeframe;
  dataDensity: 'low' | 'medium' | 'high';
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  confidenceThresholds: {
    high: number;
    medium: number;
    low: number;
  };
  display: DisplayPreferences;
  assets: {
    favorites: string[];
  };
}

// API responses
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}
