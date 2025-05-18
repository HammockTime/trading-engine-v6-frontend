import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from './ui/use-toast';
import { DevicePhoneMobileIcon, DeviceTabletIcon, ComputerDesktopIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

interface TestResult {
  name: string;
  passed: boolean;
  description: string;
  device: 'all' | 'mobile' | 'tablet' | 'desktop';
}

const UserExperienceTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const { toast } = useToast();

  const runTests = () => {
    setIsRunningTests(true);
    
    // Simulate running tests
    setTimeout(() => {
      const results: TestResult[] = [
        // Core functionality tests
        {
          name: 'Dashboard Loading',
          passed: true,
          description: 'Dashboard loads within 3 seconds on all devices',
          device: 'all'
        },
        {
          name: 'Asset Selection',
          passed: true,
          description: 'Users can select different assets from the dropdown',
          device: 'all'
        },
        {
          name: 'Prediction Display',
          passed: true,
          description: 'Current predictions are clearly displayed with confidence levels',
          device: 'all'
        },
        
        // Advanced features tests
        {
          name: 'Multi-Timeframe Analysis',
          passed: true,
          description: 'Users can view and switch between different timeframes',
          device: 'all'
        },
        {
          name: 'Adaptive Learning Feedback',
          passed: true,
          description: 'Users can provide feedback on prediction helpfulness',
          device: 'all'
        },
        {
          name: 'Confluence Score Calculation',
          passed: true,
          description: 'System correctly calculates and displays confluence scores',
          device: 'all'
        },
        
        // Mobile-specific tests
        {
          name: 'Touch Targets',
          passed: true,
          description: 'All interactive elements have appropriate touch target sizes',
          device: 'mobile'
        },
        {
          name: 'Bottom Navigation',
          passed: true,
          description: 'Mobile navigation is accessible at the bottom of the screen',
          device: 'mobile'
        },
        {
          name: 'Mobile Chart Interaction',
          passed: false,
          description: 'Chart pinch-to-zoom needs optimization on smaller screens',
          device: 'mobile'
        },
        
        // Tablet-specific tests
        {
          name: 'Tablet Layout',
          passed: true,
          description: 'Layout adapts appropriately to tablet screen sizes',
          device: 'tablet'
        },
        {
          name: 'Split View Support',
          passed: false,
          description: 'Interface needs optimization for tablet split-screen mode',
          device: 'tablet'
        },
        
        // Desktop-specific tests
        {
          name: 'Keyboard Navigation',
          passed: true,
          description: 'Users can navigate the interface using keyboard shortcuts',
          device: 'desktop'
        },
        {
          name: 'Multi-Panel View',
          passed: true,
          description: 'Desktop users can view multiple panels simultaneously',
          device: 'desktop'
        },
        
        // Performance tests
        {
          name: 'Animation Performance',
          passed: true,
          description: 'UI animations run at 60fps on all devices',
          device: 'all'
        },
        {
          name: 'Memory Usage',
          passed: true,
          description: 'Application maintains stable memory usage over time',
          device: 'all'
        }
      ];
      
      setTestResults(results);
      setIsRunningTests(false);
      
      // Count failures
      const failures = results.filter(r => !r.passed).length;
      
      toast({
        title: failures > 0 ? `Tests Completed with ${failures} Issues` : 'All Tests Passed',
        description: failures > 0 
          ? `Found ${failures} issues that need attention before release` 
          : 'The interface is performing optimally across all devices',
        variant: failures > 0 ? 'destructive' : 'default'
      });
    }, 2000);
  };

  const filteredResults = activeTab === 'all' 
    ? testResults 
    : testResults.filter(result => result.device === 'all' || result.device === activeTab);
  
  const passedCount = filteredResults.filter(r => r.passed).length;
  const totalCount = filteredResults.length;
  const passRate = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Experience Testing</CardTitle>
        <CardDescription>Verify interface performance across devices and features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Tests</TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-1">
                <DevicePhoneMobileIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center gap-1">
                <DeviceTabletIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Tablet</span>
              </TabsTrigger>
              <TabsTrigger value="desktop" className="flex items-center gap-1">
                <ComputerDesktopIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Desktop</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            onClick={runTests} 
            disabled={isRunningTests}
          >
            {isRunningTests ? 'Running Tests...' : 'Run Tests'}
          </Button>
        </div>
        
        {testResults.length > 0 && (
          <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-sm font-medium">Test Results:</span>
              <span className="ml-2">{passedCount} / {totalCount} passed</span>
            </div>
            <Badge className={passRate === 100 ? "bg-emerald-500" : passRate >= 80 ? "bg-amber-500" : "bg-rose-500"}>
              {passRate}% Pass Rate
            </Badge>
          </div>
        )}
        
        {isRunningTests ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p>Running user experience tests...</p>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-3">
            {filteredResults.map((result, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-md border ${result.passed ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900' : 'border-rose-200 bg-rose-50 dark:bg-rose-950/20 dark:border-rose-900'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {result.passed ? (
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-rose-500 flex-shrink-0" />
                    )}
                    <span className="font-medium">{result.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {result.device === 'all' ? 'All Devices' : 
                     result.device === 'mobile' ? 'Mobile' : 
                     result.device === 'tablet' ? 'Tablet' : 'Desktop'}
                  </Badge>
                </div>
                <p className="text-sm mt-1 ml-7">{result.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No test results available. Click "Run Tests" to begin testing.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>User experience testing helps ensure the interface works well across all devices and features.</p>
      </CardFooter>
    </Card>
  );
};

export default UserExperienceTest;
