import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../lib/api-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, RefreshCwIcon, InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import MultiTimeframeAnalysis from '../components/MultiTimeframeAnalysis';
import AdaptiveLearning from '../components/AdaptiveLearning';

const AssetDetailPage = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { 
    assets,
    loadingAssets,
    fetchAssets,
    assetPrediction,
    loadingAssetPrediction,
    fetchAssetPrediction,
    historicalPredictions,
    loadingHistoricalPredictions,
    fetchHistoricalPredictions,
    chartData,
    loadingChartData,
    fetchChartData,
    multiTimeframePredictions,
    confluenceScore,
    loadingMultiTimeframe,
    fetchMultiTimeframeAnalysis
  } = useApi();

  useEffect(() => {
    if (!assetId) return;
    
    // Fetch data on mount and when assetId changes
    fetchAssets();
    fetchAssetPrediction(assetId);
    fetchHistoricalPredictions(assetId, 30);
    fetchChartData(assetId, 'daily');
    fetchMultiTimeframeAnalysis(assetId);
  }, [assetId, fetchAssets, fetchAssetPrediction, fetchHistoricalPredictions, fetchChartData, fetchMultiTimeframeAnalysis]);

  const asset = assets.find(a => a.id === assetId);

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
        return <Badge className="bg-emerald-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-amber-500">Low</Badge>;
      default:
        return <Badge className="bg-slate-500">Unknown</Badge>;
    }
  };

  const renderAssetHeader = () => {
    if (loadingAssets || !asset) {
      return (
        <div className="mb-6">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      );
    }

    return (
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          {asset.name}
          <Badge className="ml-2">{asset.assetClass}</Badge>
        </h1>
        <p className="text-muted-foreground">{asset.symbol}</p>
      </div>
    );
  };

  const renderCurrentPrediction = () => {
    if (loadingAssetPrediction || !assetPrediction) {
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      );
    }

    if (!assetPrediction) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No prediction available for this asset</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => fetchAssetPrediction(assetId || '')}
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Prediction</CardTitle>
          <CardDescription>Generated on {new Date(assetPrediction.date).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getDirectionIcon(assetPrediction.direction)}
                <span className="text-xl font-medium">{assetPrediction.direction}</span>
              </div>
              {getConfidenceBadge(assetPrediction.confidenceTier)}
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Pattern Detected</h4>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Patterns are identified based on price action and market structure.
                        Click to learn more about this pattern in the Learning Center.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p>{assetPrediction.pattern}</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Confidence Score</h4>
                <span className="text-sm">{assetPrediction.confidence}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    assetPrediction.confidenceTier === 'high' 
                      ? 'bg-emerald-500' 
                      : assetPrediction.confidenceTier === 'medium'
                        ? 'bg-blue-500'
                        : 'bg-amber-500'
                  }`}
                  style={{ width: `${assetPrediction.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderHistoricalPredictions = () => {
    if (loadingHistoricalPredictions) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!historicalPredictions.length) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No historical predictions available</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => fetchHistoricalPredictions(assetId || '', 30)}
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {historicalPredictions.slice(0, 5).map((prediction, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getDirectionIcon(prediction.direction)}
                  <span className="font-medium">{prediction.direction}</span>
                </div>
                <div className="flex items-center gap-2">
                  {prediction.correct !== undefined && (
                    <Badge className={prediction.correct ? 'bg-emerald-500' : 'bg-rose-500'}>
                      {prediction.correct ? 'Correct' : 'Incorrect'}
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {new Date(prediction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <p>Pattern: {prediction.pattern}</p>
                <div className="flex justify-between items-center mt-1">
                  <p>Confidence: {prediction.confidence}%</p>
                  {getConfidenceBadge(prediction.confidenceTier)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {historicalPredictions.length > 5 && (
          <div className="text-center">
            <Button variant="outline">View All History</Button>
          </div>
        )}
      </div>
    );
  };

  const renderChart = () => {
    if (loadingChartData) {
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      );
    }

    // In a real implementation, this would render a TradingView chart
    // For now, we'll just show a placeholder
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 dark:bg-slate-800 h-[300px] rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">
              TradingView chart would be rendered here with {chartData.length} data points
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      {renderAssetHeader()}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Multi-Timeframe Analysis</TabsTrigger>
          <TabsTrigger value="history">Historical Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderCurrentPrediction()}
            
            <Card>
              <CardHeader>
                <CardTitle>Adaptive Learning</CardTitle>
                <CardDescription>Help improve our prediction accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                {assetPrediction && (
                  <AdaptiveLearning
                    assetId={assetId || ''}
                    predictionDate={assetPrediction.date}
                    predictionDirection={assetPrediction.direction}
                    confidenceTier={assetPrediction.confidenceTier}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          
          {renderChart()}
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Predictions</h3>
            {renderHistoricalPredictions()}
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Timeframe Analysis</CardTitle>
                <CardDescription>
                  View predictions across different timeframes to identify confluence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiTimeframeAnalysis assetId={assetId || ''} />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Confluence Score</CardTitle>
                  <CardDescription>
                    Weighted agreement across timeframes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingMultiTimeframe ? (
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ) : confluenceScore ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-3xl font-bold">
                            {confluenceScore.weighted > 0 ? '+' : ''}{confluenceScore.weighted}
                          </span>
                          <span className="text-muted-foreground ml-2">
                            (-100 to +100)
                          </span>
                        </div>
                        <Badge className={
                          confluenceScore.weighted > 30 ? 'bg-emerald-500' : 
                          confluenceScore.weighted < -30 ? 'bg-rose-500' : 
                          'bg-amber-500'
                        }>
                          {
                            confluenceScore.weighted > 30 ? 'Strong Bullish' : 
                            confluenceScore.weighted > 10 ? 'Bullish' : 
                            confluenceScore.weighted < -30 ? 'Strong Bearish' : 
                            confluenceScore.weighted < -10 ? 'Bearish' : 
                            'Neutral'
                          }
                        </Badge>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Directional Breakdown</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="flex items-center gap-1">
                                <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                                Bullish
                              </span>
                              <span>{confluenceScore.bullish}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-emerald-500 h-2 rounded-full"
                                style={{ width: `${confluenceScore.bullish}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="flex items-center gap-1">
                                <ArrowDownIcon className="h-4 w-4 text-rose-500" />
                                Bearish
                              </span>
                              <span>{confluenceScore.bearish}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-rose-500 h-2 rounded-full"
                                style={{ width: `${confluenceScore.bearish}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="flex items-center gap-1">
                                <MinusIcon className="h-4 w-4 text-slate-500" />
                                Neutral
                              </span>
                              <span>{confluenceScore.neutral}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-slate-500 h-2 rounded-full"
                                style={{ width: `${confluenceScore.neutral}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No confluence data available</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => fetchMultiTimeframeAnalysis(assetId || '')}
                      >
                        <RefreshCwIcon className="mr-2 h-4 w-4" />
                        Refresh
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Timeframe Weights</CardTitle>
                  <CardDescription>
                    How each timeframe contributes to the confluence score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Daily</span>
                            <span>40%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">4-Hour</span>
                            <span>30%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">1-Hour</span>
                            <span>20%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">15-Minute</span>
                            <span>10%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Longer timeframes have higher weights as they typically provide more reliable signals.
                        The weighted score is normalized to a -100 to +100 scale.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Performance</CardTitle>
                <CardDescription>
                  Past prediction accuracy for {asset?.name || 'this asset'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingHistoricalPredictions ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                ) : historicalPredictions.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md text-center">
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="text-3xl font-bold">
                          {Math.round((historicalPredictions.filter(p => p.correct).length / historicalPredictions.length) * 100)}%
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md text-center">
                        <p className="text-sm text-muted-foreground">Total Predictions</p>
                        <p className="text-3xl font-bold">{historicalPredictions.length}</p>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md text-center">
                        <p className="text-sm text-muted-foreground">Correct Predictions</p>
                        <p className="text-3xl font-bold">{historicalPredictions.filter(p => p.correct).length}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">All Historical Predictions</h4>
                      <div className="space-y-4">
                        {historicalPredictions.map((prediction, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  {getDirectionIcon(prediction.direction)}
                                  <span className="font-medium">{prediction.direction}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {prediction.correct !== undefined && (
                                    <Badge className={prediction.correct ? 'bg-emerald-500' : 'bg-rose-500'}>
                                      {prediction.correct ? 'Correct' : 'Incorrect'}
                                    </Badge>
                                  )}
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(prediction.date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 text-sm">
                                <p>Pattern: {prediction.pattern}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <p>Confidence: {prediction.confidence}%</p>
                                  {getConfidenceBadge(prediction.confidenceTier)}
                                </div>
                                {prediction.actualDirection && (
                                  <div className="mt-2 pt-2 border-t">
                                    <p className="flex items-center gap-1">
                                      Actual outcome: 
                                      {getDirectionIcon(prediction.actualDirection)}
                                      <span>{prediction.actualDirection}</span>
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No historical predictions available</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => fetchHistoricalPredictions(assetId || '', 30)}
                    >
                      <RefreshCwIcon className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetDetailPage;
