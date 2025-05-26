import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  BarChart,
  Briefcase,
  CreditCard,
  Download,
  Home,
  Menu,
  Settings,
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

// Mock auth data instead of using useAuth
const mockAuth = {
  user: { id: '1', name: 'User', email: 'user@example.com' },
  login: async () => console.log('Mock login'),
  logout: () => console.log('Mock logout'),
  isAuthenticated: true,
  isLoading: false
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  
  // Use mockAuth instead of useAuth
  const { user, logout } = mockAuth;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                <BarChart className="h-6 w-6" />
                <span>Trading Engine v6</span>
              </Link>
              <Link to="/" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link to="/asset/BTC" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Briefcase className="h-5 w-5" />
                Assets
              </Link>
              <Link to="/settings" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Link to="/guides" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Download className="h-5 w-5" />
                Strategy Guides
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <BarChart className="h-6 w-6" />
          <span>Trading Engine v6</span>
        </Link>
        <div className="flex-1"></div>
        <Button variant="outline" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <ScrollArea className="h-full py-6">
            <nav className="grid gap-2 px-4 text-lg font-medium">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                <BarChart className="h-6 w-6" />
                <span>Trading Engine v6</span>
              </Link>
              <Link to="/" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link to="/asset/BTC" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Briefcase className="h-5 w-5" />
                Assets
              </Link>
              <Link to="/settings" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Link to="/guides" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                <Download className="h-5 w-5" />
                Strategy Guides
              </Link>
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
