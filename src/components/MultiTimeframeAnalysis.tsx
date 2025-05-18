import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, InfoIcon, RefreshCwIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useToast } from './ui/use-toast';

interface TimeframePrediction {
  direction: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number;
  confidence_tier: 'high' | 'medium' | 'low';
  pattern: string;
  date: string;
}

interface MultiTimeframePredictions {
  [timeframe: string]: TimeframePrediction;
}

interface ConfluenceScore {
  bullish: number;
  bearish: number;
  neutral: number;
  weighted: number;
}

interface MultiTimeframeAnalysisProps {
  assetId: string;
  onRefresh?: () => void;
}

const MultiTimeframeAnalysis: React.FC<MultiTimeframeAnalysisProps> = ({ assetId, onRefresh }) => {
  const [predictions, setPredictions] = useState<MultiTimeframePredictions | null>(null);
  const [confluenceScore, setConfluenceScore] = useState<ConfluenceScore | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTimeframe, setActiveTimeframe] = useState<string>('daily');
  const { toast } = useToast();

  useEffect(() => {
    fetchMultiTimeframeData();
  }, [assetId]);

  const fetchMultiTimeframeData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an actual API call
      // For now, we'll simulate the response
      const token = localStorage.getItem('token');
      
      // Simulated API response
      setTimeout(() => {
        const mockPredictions: MultiTimeframePredictions = {
          'daily': {
            direction: 'Bullish',
            confidence: 78,
            confidence_tier: 'medium',
            pattern: 'Bullish Engulfing',
            date: '2025-05-16 00:00:00'
          },
          '4h': {
            direction: 'Bullish',
            confidence: 82,
            confidence_tier: 'high',
            pattern: 'Inside Bar',
            date: '2025-05-16 12:00:00'
          },
          '1h': {
            direction: 'Neutral',
            confidence: 55,
            confidence_tier: 'low',
            pattern: 'Doji',
            date: '2025-05-16 13:00:00'
          },
          '15m': {
            direction: 'Bearish',
            confidence: 68,
            confidence_tier: 'medium',
            pattern: 'Bearish Pin Bar',
            date: '2025-05-16 13:15:00'
          }
        };
        
        const mockConfluenceScore: ConfluenceScore = {
          bullish: 50,
          bearish: 25,
          neutral: 25,
          weighted: 35
        };
        
        setPredictions(mockPredictions);
        setConfluenceScore(mockConfluenceScore);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching multi-timeframe data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch multi-timeframe analysis data',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchMultiTimeframeData();
    if (onRefresh) onRefresh();
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'Bullish':
        return <ArrowUpIcon className="h-5 w-5 text-emerald-500" />;
      case 'Bearish':
        return <ArrowDownIcon className="h-5 w-5 text-rose-500" />;
      default:
        return <MinusIcon className="h-5 w-5 text-slate-500" />;
    }
  };

  const getConfidenceBadge = (tier: string) => {
    switch (tier) {
      case 'high':
        return <Badge className="bg-emerald-500">High Confidence</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500">Medium Confidence</Badge>;
      case 'low':
        return <Badge className="bg-amber-500">Low Confidence</Badge>;
      default:
        return <Badge className="bg-slate-500">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Multi-Timeframe Analysis</CardTitle>
          <CardDescription>Loading analysis across timeframes...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (!predictions || !confluenceScore) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Multi-Timeframe Analysis</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 gap-4">
          <p>Failed to load multi-timeframe analysis</p>
          <Button onClick={handleRefresh}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Multi-Timeframe Analysis</CardTitle>
          <CardDescription>Predictions across different timeframes</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCwIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTimeframe} onValueChange={setActiveTimeframe}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="4h">4 Hour</TabsTrigger>
            <TabsTrigger value="1h">1 Hour</TabsTrigger>
            <TabsTrigger value="15m">15 Min</TabsTrigger>
          </TabsList>
          
          {Object.keys(predictions).map((timeframe) => (
            <TabsContent key={timeframe} value={timeframe} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getDirectionIcon(predictions[timeframe].direction)}
                  <span className="text-lg font-medium">{predictions[timeframe].direction}</span>
                </div>
                {getConfidenceBadge(predictions[timeframe].confidence_tier)}
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Confidence</span>
                  <span className="text-sm font-medium">{predictions[timeframe].confidence}%</span>
                </div>
                <Progress value={predictions[timeframe].confidence} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Pattern</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{predictions[timeframe].pattern}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Learn more about {predictions[timeframe].pattern} pattern</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Generated: {new Date(predictions[timeframe].date).toLocaleString()}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium mb-4 flex items-center gap-2">
            Confluence Analysis
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Confluence measures agreement across timeframes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Bullish Signals</span>
                <span className="text-sm font-medium">{confluenceScore.bullish}%</span>
              </div>
              <Progress value={confluenceScore.bullish} className="h-2 bg-slate-200" indicatorClassName="bg-emerald-500" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Bearish Signals</span>
                <span className="text-sm font-medium">{confluenceScore.bearish}%</span>
              </div>
              <Progress value={confluenceScore.bearish} className="h-2 bg-slate-200" indicatorClassName="bg-rose-500" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Neutral Signals</span>
                <span className="text-sm font-medium">{confluenceScore.neutral}%</span>
              </div>
              <Progress value={confluenceScore.neutral} className="h-2 bg-slate-200" indicatorClassName="bg-slate-500" />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
            <div className="flex items-center justify-between">
              <span className="font-medium">Weighted Confluence Score</span>
              <Badge className={
                confluenceScore.weighted > 50 ? "bg-emerald-500" : 
                confluenceScore.weighted < -50 ? "bg-rose-500" : 
                "bg-slate-500"
              }>
                {confluenceScore.weighted > 0 ? "+" : ""}{confluenceScore.weighted}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {
                confluenceScore.weighted > 50 ? "Strong bullish confluence across timeframes" :
                confluenceScore.weighted > 25 ? "Moderate bullish confluence across timeframes" :
                confluenceScore.weighted > 0 ? "Slight bullish bias across timeframes" :
                confluenceScore.weighted === 0 ? "Neutral confluence across timeframes" :
                confluenceScore.weighted > -25 ? "Slight bearish bias across timeframes" :
                confluenceScore.weighted > -50 ? "Moderate bearish confluence across timeframes" :
                "Strong bearish confluence across timeframes"
              }
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>Multi-timeframe analysis helps identify stronger trading opportunities when signals align across different time periods.</p>
      </CardFooter>
    </Card>
  );
};

export default MultiTimeframeAnalysis;
