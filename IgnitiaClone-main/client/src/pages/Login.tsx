import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      setLocation('/'); // Redirect to home page
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-float blur-sm" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary/15 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              IGNITIA
            </h1>
          </div>
          <p className="text-muted-foreground text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Welcome back to the future of tech innovation
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-primary/20 shadow-glow backdrop-blur-sm bg-card/95 animate-fade-in-up">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-pulse-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Sign In
            </CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your Ignitia account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-fade-in border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-primary/20 focus:border-primary input-glow transition-all duration-300 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="border-primary/20 focus:border-primary input-glow pr-12 h-12 transition-all duration-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline animated-underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-300 btn-glow group text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <Link href="/signup">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-primary/30 hover:bg-primary/10 hover:border-primary transform hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                    Create New Account
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Admin Notice */}
        <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="p-4 rounded-xl glass border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Admin Access</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Admin users will be automatically redirected to the admin panel
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline animated-underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline animated-underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}