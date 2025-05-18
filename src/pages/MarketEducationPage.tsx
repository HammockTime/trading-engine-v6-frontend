import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { GraduationCapIcon } from 'lucide-react';

const MarketEducationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Market Education</h1>
        <p className="text-muted-foreground">
          Essential knowledge for successful trading
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Market Fundamentals */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-primary" />
              Price Action Basics
            </CardTitle>
            <CardDescription>Foundation of technical analysis</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Educational illustration</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Price action is the movement of a security's price plotted over time. This module covers candlestick reading, trend identification, and basic market structure concepts essential for any trader.
            </p>
            <Button variant="outline" className="w-full">Start Learning</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-primary" />
              Support and Resistance
            </CardTitle>
            <CardDescription>Key levels in market structure</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Educational illustration</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Support and resistance levels are areas where price has historically had difficulty moving beyond. Learn how to identify these key levels and how they influence our prediction engine's confidence scores.
            </p>
            <Button variant="outline" className="w-full">Start Learning</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-primary" />
              Trading Psychology
            </CardTitle>
            <CardDescription>Mental aspects of successful trading</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Educational illustration</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Trading psychology is often the difference between success and failure. This module covers emotional discipline, handling losses, avoiding overtrading, and maintaining a consistent trading mindset.
            </p>
            <Button variant="outline" className="w-full">Start Learning</Button>
          </CardContent>
        </Card>
        
        {/* Asset Classes */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-primary" />
              Forex Markets
            </CardTitle>
            <CardDescription>Currency pair trading fundamentals</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Educational illustration</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The foreign exchange market is the largest financial market in the world. Learn about currency pairs, pip values, market sessions, and the unique characteristics that influence our forex predictions.
            </p>
            <Button variant="outline" className="w-full">Start Learning</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-primary" />
              Precious Metals
            </CardTitle>
            <CardDescription>Gold and silver trading characteristics</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Educational illustration</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Precious metals like gold and silver have unique trading characteristics. This module covers how these markets respond to economic factors, their role as safe havens, and pattern effectiveness in metals markets.
            </p>
            <Button variant="outline" className="w-full">Start Learning</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-primary" />
              Cryptocurrencies
            </CardTitle>
            <CardDescription>Digital asset trading fundamentals</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Educational illustration</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Cryptocurrencies represent a new asset class with distinct characteristics. Learn about blockchain technology, market cycles, volatility considerations, and how our prediction engine adapts to crypto markets.
            </p>
            <Button variant="outline" className="w-full">Start Learning</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Advanced Market Concepts</CardTitle>
          <CardDescription>
            Taking your trading knowledge to the next level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-4">Market Regimes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Markets operate in different regimes that significantly impact trading strategy effectiveness:
              </p>
              <ul className="text-sm space-y-2">
                <li><strong>Trending Markets:</strong> Directional movement with momentum</li>
                <li><strong>Ranging Markets:</strong> Price oscillation between support and resistance</li>
                <li><strong>Volatile Markets:</strong> Large, unpredictable price swings</li>
                <li><strong>Low Volatility Markets:</strong> Minimal price movement and compression</li>
              </ul>
              <Button variant="outline" className="mt-4">Learn About Market Regimes</Button>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Multi-Timeframe Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Multi-timeframe analysis provides a comprehensive view of market conditions:
              </p>
              <ul className="text-sm space-y-2">
                <li><strong>Higher Timeframes:</strong> Establish overall trend direction</li>
                <li><strong>Intermediate Timeframes:</strong> Identify trading opportunities</li>
                <li><strong>Lower Timeframes:</strong> Optimize entry and exit points</li>
                <li><strong>Confluence:</strong> Highest probability when all timeframes align</li>
              </ul>
              <Button variant="outline" className="mt-4">Master Multi-Timeframe Analysis</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Educational Resources</CardTitle>
          <CardDescription>
            Comprehensive learning materials for traders at all levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Visual demonstrations of key concepts, pattern recognition, and trading strategies.
                </p>
                <Button variant="outline" className="w-full">Browse Videos</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Interactive Lessons</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Hands-on exercises to practice pattern identification and trading decisions.
                </p>
                <Button variant="outline" className="w-full">Start Lessons</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Trading Glossary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive dictionary of trading terms, indicators, and concepts.
                </p>
                <Button variant="outline" className="w-full">View Glossary</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketEducationPage;
