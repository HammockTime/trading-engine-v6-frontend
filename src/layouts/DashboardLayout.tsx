import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { useApi } from '../lib/api-context';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  User,
  Bell
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { ScrollArea } from '../components/ui/scroll-area';
import { useToast } from '../components/ui/use-toast';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { assets, fetchAssets } = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Fetch assets on mount
    fetchAssets();

    // Handle window resize for mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchAssets]);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/auth/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Learning Center',
      path: '/dashboard/learning',
      icon: <BookOpen className="h-5 w-5" />,
      subItems: [
        { name: 'Pattern Library', path: '/dashboard/learning/patterns' },
        { name: 'Strategy Guides', path: '/dashboard/learning/strategies' },
        { name: 'Market Education', path: '/dashboard/learning/education' },
      ],
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const renderNavItems = () => {
    return navItems.map((item) => (
      <div key={item.path} className="mb-1">
        {item.subItems ? (
          <div className="space-y-1">
            <Button
              variant={isActive(item.path) ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
            {isActive(item.path) && (
              <div className="ml-6 space-y-1">
                {item.subItems.map((subItem) => (
                  <Button
                    key={subItem.path}
                    variant={location.pathname === subItem.path ? 'secondary' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(subItem.path);
                      closeMobileMenu();
                    }}
                  >
                    {subItem.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Button
            variant={isActive(item.path) ? 'secondary' : 'ghost'}
            className="w-full justify-start gap-2"
            onClick={() => {
              navigate(item.path);
              closeMobileMenu();
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </Button>
        )}
      </div>
    ));
  };

  const renderAssetList = () => {
    return (
      <div className="mt-6">
        <h3 className="px-3 text-sm font-medium text-muted-foreground mb-2">Assets</h3>
        <div className="space-y-1">
          {assets.map((asset) => (
            <Button
              key={asset.id}
              variant={location.pathname === `/dashboard/asset/${asset.id}` ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                navigate(`/dashboard/asset/${asset.id}`);
                closeMobileMenu();
              }}
            >
              {asset.name}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebar = () => (
    <div className="w-64 h-full border-r bg-background">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Trading Engine</h1>
        </div>
        <div className="space-y-4">
          {renderNavItems()}
          {renderAssetList()}
        </div>
      </div>
    </div>
  );

  const renderMobileNav = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Trading Engine</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {renderNavItems()}
              {renderAssetList()}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderHeader = () => (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {isMobile && renderMobileNav()}
        {isMobile && (
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Trading Engine</h1>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.picture} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );

  const renderMobileBottomNav = () => {
    if (!isMobile) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around px-4 z-10">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="icon"
            className={`flex flex-col items-center justify-center h-full ${isActive(item.path) ? 'text-primary' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {renderHeader()}
      <div className="flex-1 flex overflow-hidden">
        {!isMobile && renderSidebar()}
        <main className="flex-1 overflow-auto p-4 pb-20 md:pb-4">
          <Outlet />
        </main>
      </div>
      {renderMobileBottomNav()}
    </div>
  );
};

export default DashboardLayout;
