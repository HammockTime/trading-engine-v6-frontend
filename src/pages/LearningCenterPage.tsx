import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, BookIcon, GraduationCapIcon } from 'lucide-react';

const LearningCenterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Learning Center</h1>
        <p className="text-muted-foreground">
          Enhance your trading knowledge with educational resources and pattern guides.
        </p>
      </div>

      <Tabs defaultValue="patterns">
        <TabsList className="mb-6">
          <TabsTrigger value="patterns" onClick={() => navigate('/dashboard/learning/patterns')}>
            Pattern Library
          </TabsTrigger>
          <TabsTrigger value="strategies" onClick={() => navigate('/dashboard/learning/strategies')}>
            Strategy Guides
          </TabsTrigger>
          <TabsTrigger value="education" onClick={() => navigate('/dashboard/learning/education')}>
            Market Education
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-primary" />
                  Bullish Patterns
                </CardTitle>
                <CardDescription>Patterns indicating potential upward movement</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm">
                  <li>Bullish Engulfing</li>
                  <li>Morning Star</li>
                  <li>Hammer</li>
                  <li>Bullish Inside Bar</li>
                  <li>Cup and Handle</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">View All</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-primary" />
                  Bearish Patterns
                </CardTitle>
                <CardDescription>Patterns indicating potential downward movement</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm">
                  <li>Bearish Engulfing</li>
                  <li>Evening Star</li>
                  <li>Shooting Star</li>
                  <li>Bearish Inside Bar</li>
                  <li>Head and Shoulders</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">View All</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-primary" />
                  Continuation Patterns
                </CardTitle>
                <CardDescription>Patterns indicating potential trend continuation</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm">
                  <li>Flags and Pennants</li>
                  <li>Triangles</li>
                  <li>Rectangles</li>
                  <li>Wedges</li>
                  <li>Channels</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">View All</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Pattern Recognition Guide</CardTitle>
              <CardDescription>How our system identifies and classifies patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our prediction engine uses advanced algorithms to identify patterns in price action. 
                Each pattern is assigned a confidence score based on multiple factors including:
              </p>
              <ul className="space-y-2 text-sm">
                <li>Pattern clarity and adherence to classical definitions</li>
                <li>Supporting volume characteristics</li>
                <li>Location relative to key support/resistance levels</li>
                <li>Confirmation from multiple timeframes</li>
                <li>Historical performance of similar patterns</li>
              </ul>
              <Button className="mt-6">Learn More About Our Methodology</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <BookIcon className="h-5 w-5 text-primary" />
                  High Confidence Strategies
                </CardTitle>
                <CardDescription>Trading approaches for high confidence signals</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Strategies optimized for signals with 80%+ confidence levels, focusing on quality over quantity.
                </p>
                <Button variant="outline" className="w-full">View Strategies</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <BookIcon className="h-5 w-5 text-primary" />
                  Medium Confidence Strategies
                </CardTitle>
                <CardDescription>Balanced approaches for medium confidence signals</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Strategies for signals with 65-80% confidence, balancing opportunity frequency with risk management.
                </p>
                <Button variant="outline" className="w-full">View Strategies</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <BookIcon className="h-5 w-5 text-primary" />
                  Low Confidence Strategies
                </CardTitle>
                <CardDescription>Educational approaches for low confidence signals</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Learning-focused strategies for signals with 50-65% confidence, emphasizing skill development.
                </p>
                <Button variant="outline" className="w-full">View Strategies</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Risk Management Framework</CardTitle>
              <CardDescription>Essential principles for sustainable trading</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Effective risk management is crucial for long-term trading success. Our framework includes:
              </p>
              <ul className="space-y-2 text-sm">
                <li>Position sizing based on confidence tiers</li>
                <li>Stop-loss placement strategies</li>
                <li>Take-profit optimization</li>
                <li>Maximum exposure guidelines</li>
                <li>Drawdown management techniques</li>
              </ul>
              <Button className="mt-6">Explore Risk Management</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCapIcon className="h-5 w-5 text-primary" />
                  Market Fundamentals
                </CardTitle>
                <CardDescription>Essential concepts for new traders</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm">
                  <li>Price Action Basics</li>
                  <li>Support and Resistance</li>
                  <li>Trend Identification</li>
                  <li>Market Structure</li>
                  <li>Trading Psychology</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">Start Learning</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCapIcon className="h-5 w-5 text-primary" />
                  Asset Classes
                </CardTitle>
                <CardDescription>Understanding different market characteristics</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm">
                  <li>Forex Markets</li>
                  <li>Precious Metals</li>
                  <li>Cryptocurrencies</li>
                  <li>Market Correlations</li>
                  <li>Trading Hours and Liquidity</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">Explore Assets</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCapIcon className="h-5 w-5 text-primary" />
                  Advanced Concepts
                </CardTitle>
                <CardDescription>Taking your trading to the next level</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm">
                  <li>Market Regimes</li>
                  <li>Volatility Analysis</li>
                  <li>Multi-Timeframe Confluence</li>
                  <li>Adaptive Position Sizing</li>
                  <li>Performance Analytics</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">Dive Deeper</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
              <CardDescription>Structured approach to mastering trading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium">Foundation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Master the fundamentals of market structure, price action, and basic patterns.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium">Application</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn to apply pattern recognition and develop a consistent trading approach.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium">Refinement</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Optimize your strategy with advanced concepts and performance analysis.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium">Mastery</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Develop your own trading style and adapt to changing market conditions.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-6">Start Your Learning Journey</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningCenterPage;
