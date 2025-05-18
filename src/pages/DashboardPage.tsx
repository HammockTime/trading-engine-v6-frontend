import React, { useEffect } from 'react';
import { useApi } from '../lib/api-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, RefreshCwIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MultiTimeframeAnalysis from '../components/MultiTimeframeAnalysis';
import AdaptiveLearning from '../components/AdaptiveLearning';

const DashboardPage = () => {
  const { 
    assets, 
    loadingAssets, 
    fetchAssets,
    currentPredictions,
    loadingCurrentPredictions,
    fetchCurrentPredictions,
    performanceSummary,
    loadingPerformance,
    fetchPerformanceSummary
  } = useApi();
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data on mount
    fetchAssets();
    fetchCurrentPredictions();
    fetchPerformanceSummary();
  }, [fetchAssets, fetchCurrentPredictions, fetchPerformanceSummary]);

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

  const renderActivePredictions = () => {
    if (loadingCurrentPredictions || loadingAssets) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-4">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!assets.length || !Object.keys(currentPredictions).length) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No active predictions available</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                fetchAssets();
                fetchCurrentPredictions();
              }}
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => {
          const prediction = currentPredictions[asset.id];
          if (!prediction) return null;

          return (
            <Card 
              key={asset.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/dashboard/asset/${asset.id}`)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{asset.name}</CardTitle>
                <CardDescription>{asset.symbol}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    {getDirectionIcon(prediction.direction)}
                    <span className="font-medium">{prediction.direction}</span>
                  </div>
                  {getConfidenceBadge(prediction.confidenceTier)}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Pattern: {prediction.pattern}</p>
                  <p>Confidence: {prediction.confidence}%</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderPerformanceSummary = () => {
    if (loadingPerformance) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-1/4 mt-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      );
    }

    if (!performanceSummary) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No performance data available</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={fetchPerformanceSummary}
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>Prediction accuracy across all assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-3xl font-bold">{performanceSummary.overall.winRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Predictions</p>
                <p className="text-3xl font-bold">{performanceSummary.overall.totalPredictions}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Correct Predictions</p>
                <p className="text-3xl font-bold">{performanceSummary.overall.correctPredictions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-lg font-medium mb-4">Performance by Confidence Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-emerald-500">High</Badge>
                Confidence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{performanceSummary.byConfidence.high.winRate}%</p>
              <p className="text-sm text-muted-foreground">
                {performanceSummary.byConfidence.high.correctPredictions} of {performanceSummary.byConfidence.high.totalPredictions} correct
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-blue-500">Medium</Badge>
                Confidence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{performanceSummary.byConfidence.medium.winRate}%</p>
              <p className="text-sm text-muted-foreground">
                {performanceSummary.byConfidence.medium.correctPredictions} of {performanceSummary.byConfidence.medium.totalPredictions} correct
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-amber-500">Low</Badge>
                Confidence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{performanceSummary.byConfidence.low.winRate}%</p>
              <p className="text-sm text-muted-foreground">
                {performanceSummary.byConfidence.low.correctPredictions} of {performanceSummary.byConfidence.low.totalPredictions} correct
              </p>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-lg font-medium mb-4">Top Performing Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(performanceSummary.byAsset)
            .sort(([, a], [, b]) => b.winRate - a.winRate)
            .slice(0, 3)
            .map(([assetId, metrics]) => {
              const asset = assets.find(a => a.id === assetId);
              if (!asset) return null;

              return (
                <Card 
                  key={assetId}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/dashboard/asset/${assetId}`)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{asset.name}</CardTitle>
                    <CardDescription>{asset.symbol}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{metrics.winRate}%</p>
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                      </div>
                      <Badge className="bg-primary">{asset.assetClass}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Trading Prediction Engine. View current predictions and performance metrics.
        </p>
      </div>

      <Tabs defaultValue="predictions">
        <TabsList className="mb-4">
          <TabsTrigger value="predictions">Active Predictions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analysis">Advanced Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="predictions" className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Active Predictions</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  fetchAssets();
                  fetchCurrentPredictions();
                }}
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
            {renderActivePredictions()}
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Performance Metrics</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchPerformanceSummary}
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
            {renderPerformanceSummary()}
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assets.length > 0 && (
              <>
                <MultiTimeframeAnalysis assetId={assets[0].id} />
                <AdaptiveLearning 
                  assetId={assets[0].id}
                  predictionDate="2025-05-16"
                  predictionDirection="Bullish"
                  confidenceTier="medium"
                />
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
