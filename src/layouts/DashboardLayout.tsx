import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useMocks';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'font-bold text-primary' : '';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <button className="md:hidden" onClick={() => document.getElementById('sidebar')?.classList.toggle('hidden')}>
          Toggle navigation menu
        </button>
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>Trading Engine v6</span>
        </Link>
        <div className="flex-1"></div>
        <button className="relative h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
        </button>
        <div className="relative">
          <button onClick={( ) => document.getElementById('user-menu')?.classList.toggle('hidden')} className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            U
          </button>
          <div id="user-menu" className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700">My Account</div>
              <hr />
              <button onClick={() => navigate('/settings')} className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Settings</button>
              <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Support</button>
              <hr />
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Logout</button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside id="sidebar" className="w-64 border-r bg-background md:block">
          <div className="h-full py-6">
            <nav className="grid gap-2 px-4 text-lg font-medium">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Trading Engine v6</span>
              </Link>
              <Link to="/" className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground ${isActive('/' )}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Dashboard
              </Link>
              <Link to="/asset/BTC" className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground ${isActive('/asset/BTC' )}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Assets
              </Link>
              <Link to="/settings" className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground ${isActive('/settings' )}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Settings
              </Link>
              <Link to="/guides" className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground ${isActive('/guides' )}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M2 15h10"></path>
                  <path d="m9 18 3-3-3-3"></path>
                </svg>
                Strategy Guides
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
   );
};

export default DashboardLayout;
