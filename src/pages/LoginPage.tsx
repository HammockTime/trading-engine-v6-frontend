import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useToast } from '../components/ui/use-toast';
import { useAuth } from '../lib/auth-context';
import { GoogleIcon } from '../components/icons/GoogleIcon';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, handleGoogleCallback } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login();
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // In a real implementation, this would trigger the Google OAuth flow
    // For now, we'll simulate a successful login
    
    const mockGoogleResponse = {
      credential: 'mock_google_token',
      email: 'google_user@example.com',
      name: 'Google User',
      picture: 'https://ui-avatars.com/api/?name=Google+User&background=0D8ABC&color=fff',
    };
    
    handleGoogleCallback(mockGoogleResponse)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        toast({
          title: 'Google login failed',
          description: 'Please try again or use email login',
          variant: 'destructive',
        });
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
      
      <Button 
        variant="outline" 
        className="w-full mb-4 flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Continue with Google</span>
      </Button>
      
      <div className="relative my-6">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white dark:bg-slate-800 px-2 text-sm text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="p-0 h-auto text-xs" type="button">
              Forgot password?
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account?</span>{' '}
        <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/auth/register')}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
