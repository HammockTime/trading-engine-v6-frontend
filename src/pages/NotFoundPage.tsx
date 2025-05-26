import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="mt-2 text-xl">Page Not Found</h2>
      <p className="mt-4 text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
