import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useToast } from '../components/ui/use-toast';
import { useAuth } from '../lib/auth-context';
import { GoogleIcon } from '../components/icons/GoogleIcon';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { handleGoogleCallback } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call an API to register the user
      // For now, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created. Please log in.',
      });
      
      navigate('/auth/login');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // In a real implementation, this would trigger the Google OAuth flow
    // For now, we'll simulate a successful registration
    
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
          title: 'Google registration failed',
          description: 'Please try again or use email registration',
          variant: 'destructive',
        });
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      
      <Button 
        variant="outline" 
        className="w-full mb-4 flex items-center justify-center gap-2"
        onClick={handleGoogleRegister}
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Continue with Google</span>
      </Button>
      
      <div className="relative my-6">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white dark:bg-slate-800 px-2 text-sm text-muted-foreground">
            or register with email
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account?</span>{' '}
        <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/auth/login')}>
          Log in
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
