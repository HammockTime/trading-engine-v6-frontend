import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpenIcon } from 'lucide-react';

const PatternLibraryPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Pattern Library</h1>
        <p className="text-muted-foreground">
          Learn about the trading patterns our prediction engine identifies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bullish Patterns */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Bullish Engulfing</CardTitle>
            <CardDescription>Strong reversal pattern</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Pattern visualization</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A bullish engulfing pattern occurs when a small bearish candle is followed by a large bullish candle that completely engulfs the previous candle, indicating a potential reversal from bearish to bullish momentum.
            </p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Morning Star</CardTitle>
            <CardDescription>Three-candle reversal pattern</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Pattern visualization</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A morning star is a three-candle pattern consisting of a large bearish candle, followed by a small-bodied candle, and completed by a large bullish candle. It signals a potential bottom and reversal from a downtrend.
            </p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Hammer</CardTitle>
            <CardDescription>Single-candle reversal pattern</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Pattern visualization</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A hammer is a single-candle pattern with a small body at the top and a long lower shadow, typically at least twice the length of the body. It indicates a rejection of lower prices and potential reversal.
            </p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardContent>
        </Card>
        
        {/* Bearish Patterns */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Bearish Engulfing</CardTitle>
            <CardDescription>Strong reversal pattern</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Pattern visualization</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A bearish engulfing pattern occurs when a small bullish candle is followed by a large bearish candle that completely engulfs the previous candle, indicating a potential reversal from bullish to bearish momentum.
            </p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Evening Star</CardTitle>
            <CardDescription>Three-candle reversal pattern</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Pattern visualization</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              An evening star is a three-candle pattern consisting of a large bullish candle, followed by a small-bodied candle, and completed by a large bearish candle. It signals a potential top and reversal from an uptrend.
            </p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Shooting Star</CardTitle>
            <CardDescription>Single-candle reversal pattern</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-slate-100 dark:bg-slate-800 h-40 rounded-md mb-4 flex items-center justify-center">
              <p className="text-muted-foreground">Pattern visualization</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A shooting star is a single-candle pattern with a small body at the bottom and a long upper shadow, typically at least twice the length of the body. It indicates a rejection of higher prices and potential reversal.
            </p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-primary" />
            Understanding Pattern Context
          </CardTitle>
          <CardDescription>
            How our prediction engine evaluates patterns in market context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            While individual patterns provide valuable signals, our prediction engine evaluates them within broader market context to improve accuracy:
          </p>
          <ul className="space-y-2 text-sm">
            <li><strong>Trend Analysis:</strong> Patterns are weighted differently depending on whether they align with or counter the prevailing trend</li>
            <li><strong>Support/Resistance:</strong> Patterns near key levels receive higher confidence scores</li>
            <li><strong>Volume Confirmation:</strong> Patterns with supporting volume characteristics are prioritized</li>
            <li><strong>Multiple Timeframes:</strong> Patterns confirmed across multiple timeframes receive higher confidence</li>
            <li><strong>Market Volatility:</strong> Pattern interpretation is adjusted based on current market volatility</li>
          </ul>
          <Button className="mt-6">Learn More About Pattern Context</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternLibraryPage;
