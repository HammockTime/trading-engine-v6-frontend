import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Trading Prediction Engine</h1>
          <p className="text-muted-foreground mt-2">Advanced market predictions with adaptive learning</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
