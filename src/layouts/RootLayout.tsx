import { Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';

const RootLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default RootLayout;
