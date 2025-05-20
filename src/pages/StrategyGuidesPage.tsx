import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookIcon } from 'lucide-react';

const StrategyGuidesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Strategy Guides</h1>
        <p className="text-muted-foreground">
          Learn how to trade effectively with different confidence levels
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Confidence Strategy */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              High Confidence Strategy
            </CardTitle>
            <CardDescription>For signals with 80%+ confidence</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              High confidence signals occur less frequently but offer the highest probability of success. This strategy focuses on maximizing returns from these premium opportunities.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Position Sizing</h4>
                <p className="text-xs text-muted-foreground">
                  2-3% of trading capital per position
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Stop Loss</h4>
                <p className="text-xs text-muted-foreground">
                  1 ATR below entry for bullish trades, 1 ATR above entry for bearish trades
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Take Profit</h4>
                <p className="text-xs text-muted-foreground">
                  2-3 ATR from entry, or at next major resistance/support level
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Timeframe</h4>
                <p className="text-xs text-muted-foreground">
                  Daily charts for signal, 4H for entry refinement
                </p>
              </div>
            </div>
            <Button className="w-full mt-6">Full Strategy Guide</Button>
          </CardContent>
        </Card>
        
        {/* Medium Confidence Strategy */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4 bg-blue-50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Medium Confidence Strategy
            </CardTitle>
            <CardDescription>For signals with 65-80% confidence</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Medium confidence signals provide a balance between frequency and reliability. This strategy focuses on consistent returns with prudent risk management.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Position Sizing</h4>
                <p className="text-xs text-muted-foreground">
                  1-2% of trading capital per position
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Stop Loss</h4>
                <p className="text-xs text-muted-foreground">
                  1.5 ATR below entry for bullish trades, 1.5 ATR above entry for bearish trades
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Take Profit</h4>
                <p className="text-xs text-muted-foreground">
                  1.5-2 ATR from entry, or at next significant resistance/support
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Timeframe</h4>
                <p className="text-xs text-muted-foreground">
                  4H charts for signal, 1H for entry refinement
                </p>
              </div>
            </div>
            <Button className="w-full mt-6">Full Strategy Guide</Button>
          </CardContent>
        </Card>
        
        {/* Low Confidence Strategy */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4 bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              Low Confidence Strategy
            </CardTitle>
            <CardDescription>For signals with 50-65% confidence</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Low confidence signals are primarily for educational purposes and skill development. This strategy focuses on learning with minimal risk.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Position Sizing</h4>
                <p className="text-xs text-muted-foreground">
                  0.5-1% of trading capital per position, or paper trading
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Stop Loss</h4>
                <p className="text-xs text-muted-foreground">
                  2 ATR below entry for bullish trades, 2 ATR above entry for bearish trades
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Take Profit</h4>
                <p className="text-xs text-muted-foreground">
                  1-1.5 ATR from entry, or at nearest resistance/support
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Timeframe</h4>
                <p className="text-xs text-muted-foreground">
                  1H charts for signal, 15m for entry refinement
                </p>
              </div>
            </div>
            <Button className="w-full mt-6">Full Strategy Guide</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookIcon className="h-5 w-5 text-primary" />
            Risk Management Framework
          </CardTitle>
          <CardDescription>
            Essential principles for sustainable trading
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Effective risk management is the foundation of successful trading. Our framework is designed to protect your capital while maximizing returns:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Position Sizing</h4>
                <ul className="text-sm space-y-1">
                  <li>• Never risk more than 2-3% of capital on any single trade</li>
                  <li>• Scale position size based on confidence level</li>
                  <li>• Consider reducing size during drawdown periods</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Stop Loss Placement</h4>
                <ul className="text-sm space-y-1">
                  <li>• Always use stop losses for every trade</li>
                  <li>• Place stops at logical levels based on market structure</li>
                  <li>• Use ATR to determine appropriate stop distance</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Take Profit Strategy</h4>
                <ul className="text-sm space-y-1">
                  <li>• Set realistic profit targets based on market conditions</li>
                  <li>• Consider scaling out of positions at multiple levels</li>
                  <li>• Use risk-reward ratios appropriate to confidence level</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Portfolio Management</h4>
                <ul className="text-sm space-y-1">
                  <li>• Diversify across different assets and asset classes</li>
                  <li>• Limit correlation between open positions</li>
                  <li>• Monitor total portfolio exposure and drawdown</li>
                </ul>
              </div>
            </div>
          </div>
          <Button className="mt-6">Comprehensive Risk Management Guide</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Multi-Timeframe Confluence Strategy</CardTitle>
          <CardDescription>
            Leveraging signals across multiple timeframes for higher probability trades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our multi-timeframe confluence strategy identifies opportunities where signals align across different timeframes, significantly increasing probability of success:
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Confluence Scoring</h4>
              <p className="text-sm">
                The weighted confluence score measures agreement across timeframes, with higher weights assigned to longer timeframes:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Daily: 40% weight</li>
                <li>• 4-Hour: 30% weight</li>
                <li>• 1-Hour: 20% weight</li>
                <li>• 15-Minute: 10% weight</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Trading Rules</h4>
              <ul className="text-sm space-y-1">
                <li>• Strong Bullish (&gt;30): Aggressive long positions with wider targets</li>
                <li>• Bullish (10-30): Standard long positions</li>
                <li>• Neutral (-10 to 10): Avoid trading or use reduced position size</li>
                <li>• Bearish (-30 to -10): Standard short positions</li>
                <li>• Strong Bearish (&lt;-30): Aggressive short positions with wider targets</li>
              </ul>
            </div>
          </div>
          <Button className="mt-6">Full Multi-Timeframe Strategy Guide</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyGuidesPage;
