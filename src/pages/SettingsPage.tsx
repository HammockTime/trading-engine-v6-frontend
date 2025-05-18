import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useToast } from '../components/ui/use-toast';
import { useAuth } from '../lib/auth-context';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  
  // Confidence threshold settings
  const [highConfidenceThreshold, setHighConfidenceThreshold] = useState(80);
  const [mediumConfidenceThreshold, setMediumConfidenceThreshold] = useState(65);
  const [lowConfidenceThreshold, setLowConfidenceThreshold] = useState(50);
  
  // Display settings
  const [theme, setTheme] = useState('system');
  const [defaultTimeframe, setDefaultTimeframe] = useState('daily');
  const [dataDensity, setDataDensity] = useState('medium');
  
  const handleSaveSettings = () => {
    // In a real implementation, this would save settings to the backend
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your experience and preferences.
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Trading Preferences</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label>Name</Label>
                <div className="font-medium">{user?.name || 'User'}</div>
              </div>
              
              <div className="space-y-1">
                <Label>Email</Label>
                <div className="font-medium">{user?.email || 'user@example.com'}</div>
              </div>
              
              <div className="space-y-1">
                <Label>Account Created</Label>
                <div className="font-medium">
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString() 
                    : new Date().toLocaleDateString()}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="destructive" onClick={logout}>
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Google Authentication</CardTitle>
              <CardDescription>Manage your Google account connection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Google Account</p>
                  <p className="text-sm text-muted-foreground">
                    Your account is connected to Google
                  </p>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>Permanently delete your account and all data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications within the application
                  </p>
                </div>
                <Switch
                  id="in-app-notifications"
                  checked={inAppNotifications}
                  onCheckedChange={setInAppNotifications}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Choose which events trigger notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Predictions</Label>
                  <p className="text-sm text-muted-foreground">
                    When new trading predictions are available
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>High Confidence Signals</Label>
                  <p className="text-sm text-muted-foreground">
                    Only for predictions with high confidence
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Performance Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly summary of prediction performance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Educational Content</Label>
                  <p className="text-sm text-muted-foreground">
                    New learning resources and guides
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Confidence Thresholds</CardTitle>
              <CardDescription>Customize confidence level classifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>High Confidence Threshold</Label>
                    <span>{highConfidenceThreshold}%</span>
                  </div>
                  <Slider
                    value={[highConfidenceThreshold]}
                    min={70}
                    max={95}
                    step={1}
                    onValueChange={(value) => setHighConfidenceThreshold(value[0])}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Predictions with confidence above this threshold are classified as high confidence
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Medium Confidence Threshold</Label>
                    <span>{mediumConfidenceThreshold}%</span>
                  </div>
                  <Slider
                    value={[mediumConfidenceThreshold]}
                    min={55}
                    max={75}
                    step={1}
                    onValueChange={(value) => setMediumConfidenceThreshold(value[0])}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Predictions with confidence above this threshold but below high confidence are classified as medium confidence
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Low Confidence Threshold</Label>
                    <span>{lowConfidenceThreshold}%</span>
                  </div>
                  <Slider
                    value={[lowConfidenceThreshold]}
                    min={40}
                    max={60}
                    step={1}
                    onValueChange={(value) => setLowConfidenceThreshold(value[0])}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Predictions with confidence above this threshold but below medium confidence are classified as low confidence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Asset Preferences</CardTitle>
              <CardDescription>Customize which assets you want to track</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Favorite Assets</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Gold (XAUUSD)
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Silver (XAGUSD)
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      EUR/USD
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      GBP/USD
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Bitcoin (BTCUSD)
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" />
                      Ethereum (ETHUSD)
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Asset Classes</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Metals
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Forex
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Cryptocurrencies
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Choose your preferred color theme</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="rounded-md border border-border p-2 mb-2">
                      <div className="space-y-2">
                        <div className="bg-primary h-2 w-8 rounded"></div>
                        <div className="bg-muted h-2 w-12 rounded"></div>
                        <div className="bg-muted h-2 w-10 rounded"></div>
                      </div>
                    </div>
                    <span>Light</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="rounded-md border border-border bg-slate-950 p-2 mb-2">
                      <div className="space-y-2">
                        <div className="bg-primary h-2 w-8 rounded"></div>
                        <div className="bg-slate-800 h-2 w-12 rounded"></div>
                        <div className="bg-slate-800 h-2 w-10 rounded"></div>
                      </div>
                    </div>
                    <span>Dark</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                  <Label
                    htmlFor="theme-system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="rounded-md border border-border p-2 mb-2">
                      <div className="flex space-x-2">
                        <div className="w-1/2 space-y-2">
                          <div className="bg-primary h-2 w-4 rounded"></div>
                          <div className="bg-muted h-2 w-6 rounded"></div>
                          <div className="bg-muted h-2 w-5 rounded"></div>
                        </div>
                        <div className="w-1/2 space-y-2 bg-slate-950 p-1 rounded">
                          <div className="bg-primary h-2 w-4 rounded"></div>
                          <div className="bg-slate-800 h-2 w-6 rounded"></div>
                          <div className="bg-slate-800 h-2 w-5 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <span>System</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Default Timeframe</CardTitle>
              <CardDescription>Choose your preferred default timeframe for charts and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={defaultTimeframe} onValueChange={setDefaultTimeframe} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <RadioGroupItem value="daily" id="timeframe-daily" className="sr-only" />
                  <Label
                    htmlFor="timeframe-daily"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Daily</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="4h" id="timeframe-4h" className="sr-only" />
                  <Label
                    htmlFor="timeframe-4h"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>4-Hour</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="1h" id="timeframe-1h" className="sr-only" />
                  <Label
                    htmlFor="timeframe-1h"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>1-Hour</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="15m" id="timeframe-15m" className="sr-only" />
                  <Label
                    htmlFor="timeframe-15m"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>15-Minute</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Density</CardTitle>
              <CardDescription>Choose how much information is displayed at once</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={dataDensity} onValueChange={setDataDensity} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="low" id="density-low" className="sr-only" />
                  <Label
                    htmlFor="density-low"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="space-y-4 w-full mb-2">
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                    </div>
                    <span>Low</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="medium" id="density-medium" className="sr-only" />
                  <Label
                    htmlFor="density-medium"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="space-y-2 w-full mb-2">
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                    </div>
                    <span>Medium</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="high" id="density-high" className="sr-only" />
                  <Label
                    htmlFor="density-high"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="space-y-1 w-full mb-2">
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                      <div className="bg-muted h-2 w-full rounded"></div>
                    </div>
                    <span>High</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
