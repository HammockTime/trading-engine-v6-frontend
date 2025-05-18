import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, InfoIcon, RefreshCwIcon, SmartphoneIcon, TabletIcon, MonitorIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useToast } from './ui/use-toast';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface MobileResponsivenessTestProps {
  onToggleView?: (view: 'mobile' | 'tablet' | 'desktop') => void;
}

const MobileResponsivenessTest: React.FC<MobileResponsivenessTestProps> = ({ onToggleView }) => {
  const [currentView, setCurrentView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const { toast } = useToast();

  useEffect(() => {
    // Automatically detect device type
    if (isMobile) {
      setCurrentView('mobile');
    } else if (isTablet) {
      setCurrentView('tablet');
    } else {
      setCurrentView('desktop');
    }
  }, [isMobile, isTablet]);

  const handleViewChange = (view: 'mobile' | 'tablet' | 'desktop') => {
    setCurrentView(view);
    if (onToggleView) {
      onToggleView(view);
    }
    
    toast({
      title: `${view.charAt(0).toUpperCase() + view.slice(1)} View`,
      description: `Switched to ${view} view for testing`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Responsive Testing</CardTitle>
        <CardDescription>Test the interface across different device sizes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <Button 
            variant={currentView === 'mobile' ? 'default' : 'outline'} 
            onClick={() => handleViewChange('mobile')}
            className="flex items-center gap-2"
          >
            <SmartphoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </Button>
          <Button 
            variant={currentView === 'tablet' ? 'default' : 'outline'} 
            onClick={() => handleViewChange('tablet')}
            className="flex items-center gap-2"
          >
            <TabletIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Tablet</span>
          </Button>
          <Button 
            variant={currentView === 'desktop' ? 'default' : 'outline'} 
            onClick={() => handleViewChange('desktop')}
            className="flex items-center gap-2"
          >
            <MonitorIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Desktop</span>
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
          <h3 className="font-medium mb-2">Current View: {currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {currentView === 'mobile' 
              ? 'Optimized for smartphones with touch-friendly controls and focused content.'
              : currentView === 'tablet'
                ? 'Balanced layout for medium-sized screens with enhanced navigation.'
                : 'Full-featured experience for large screens with comprehensive data visualization.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Features Available</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                  Trading Predictions
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                  Multi-Timeframe Analysis
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                  Adaptive Learning
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                  Basic Charts
                </li>
                {currentView !== 'mobile' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Advanced Charts
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Performance Analytics
                    </li>
                  </>
                )}
                {currentView === 'desktop' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Pattern Library
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Custom Drawing Tools
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Optimizations</h4>
              <ul className="text-sm space-y-1">
                {currentView === 'mobile' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Touch-optimized controls
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Simplified navigation
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Reduced data density
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Bottom navigation bar
                    </li>
                  </>
                )}
                {currentView === 'tablet' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Optimized for both touch and mouse
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Adaptive layouts
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Collapsible sidebars
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Medium data density
                    </li>
                  </>
                )}
                {currentView === 'desktop' && (
                  <>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Multi-panel layouts
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Advanced interactions
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      High data density
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">✓</Badge>
                      Keyboard shortcuts
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>The interface automatically adapts to your device, but you can manually test different views here.</p>
      </CardFooter>
    </Card>
  );
};

export default MobileResponsivenessTest;
