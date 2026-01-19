import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  User, Mail, Phone, GraduationCap, Eye, EyeOff, 
  Sparkles, ArrowRight, ArrowLeft, CheckCircle, 
  Shield, Key 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { authAPI, authStorage, College } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type SignupStep = 'personal' | 'college' | 'password';

interface FormData {
  // Personal Info
  name: string;
  email: string;
  contact_number: string;
  // College Info
  college: string;
  roll_number: string;
  // Password
  password: string;
  confirm_password: string;
}

export default function Signup() {
  const [, setLocation] = useLocation();
  const { setAuthData } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<SignupStep>('personal');
  const [sessionId, setSessionId] = useState<string>('');
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact_number: '',
    college: '',
    roll_number: '',
    password: '',
    confirm_password: '',
  });

  const steps = {
    personal: { title: 'Personal Information', progress: 33 },
    college: { title: 'College Information', progress: 66 },
    password: { title: 'Create Password', progress: 100 },
  };

  // Load colleges on component mount
  useEffect(() => {
    const loadColleges = async () => {
      try {
        const collegeList = await authAPI.getColleges();
        setColleges(collegeList);
      } catch (error) {
        console.error('Failed to load colleges:', error);
      }
    };
    loadColleges();

    // Restore session if exists
    const savedSessionId = authStorage.getSessionId();
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.submitPersonalInfo({
        name: formData.name,
        email: formData.email,
        contact_number: formData.contact_number,
      });
      
      setSessionId(response.session_id);
      authStorage.setSessionId(response.session_id);
      setCurrentStep('college');
      
      toast({
        title: "Personal information saved!",
        description: "Please provide your college information.",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollegeInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const collegeData: any = { college: formData.college };
      if (formData.college === 'PSIT' && formData.roll_number) {
        collegeData.roll_number = formData.roll_number;
      }

      await authAPI.submitCollegeInfo(collegeData, sessionId);
      setCurrentStep('password');
      
      toast({
        title: "College information saved!",
        description: "Please create your password to complete registration.",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.completeRegistration({
        password: formData.password,
        confirm_password: formData.confirm_password,
      }, sessionId);

      setAuthData(response.user, response.token);
      authStorage.removeSessionId();
      
      toast({
        title: "Registration completed!",
        description: `Welcome to Ignitia, ${response.user.name}!`,
      });

      if (response.is_admin) {
        setLocation('/admin');
      } else {
        setLocation('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPersonalInfoStep = () => (
    <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="border-primary/20 focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
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
          className="border-primary/20 focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_number" className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Contact Number
        </Label>
        <Input
          id="contact_number"
          name="contact_number"
          type="tel"
          placeholder="10-digit mobile number"
          value={formData.contact_number}
          onChange={handleInputChange}
          maxLength={10}
          pattern="[0-9]{10}"
          required
          className="border-primary/20 focus:border-primary"
        />
        <p className="text-sm text-muted-foreground">Enter 10-digit mobile number without country code</p>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </Button>
    </form>
  );

  const renderCollegeInfoStep = () => (
    <form onSubmit={handleCollegeInfoSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="college" className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          College/University
        </Label>
        <Select value={formData.college} onValueChange={(value) => handleSelectChange('college', value)}>
          <SelectTrigger className="border-primary/20 focus:border-primary">
            <SelectValue placeholder="Select your college" />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((college) => (
              <SelectItem key={college.id} value={college.code}>
                {college.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.college === 'PSIT' && (
        <div className="space-y-2">
          <Label htmlFor="roll_number" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Roll Number
          </Label>
          <Input
            id="roll_number"
            name="roll_number"
            placeholder="Enter your 13-digit roll number"
            value={formData.roll_number}
            onChange={handleInputChange}
            maxLength={13}
            pattern="[0-9]{13}"
            required
            className="border-primary/20 focus:border-primary"
          />
          <p className="text-sm text-muted-foreground">PSIT students must provide their 13-digit roll number</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep('personal')}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div className="space-y-2 text-center mb-6">
        <Shield className="w-16 h-16 text-primary mx-auto" />
        <h3 className="text-xl font-semibold">Create your password</h3>
        <p className="text-muted-foreground">
          Choose a strong password to secure your account
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          <Key className="w-4 h-4" />
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
            minLength={8}
            className="border-primary/20 focus:border-primary pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm_password" className="flex items-center gap-2">
          <Key className="w-4 h-4" />
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirm_password}
            onChange={handleInputChange}
            required
            minLength={8}
            className="border-primary/20 focus:border-primary pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>Password requirements:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>At least 8 characters long</li>
          <li>Mix of letters, numbers, and symbols recommended</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep('college')}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Complete Registration
              <CheckCircle className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </form>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return renderPersonalInfoStep();
      case 'college':
        return renderCollegeInfoStep();
      case 'password':
        return renderPasswordStep();
      default:
        return renderPersonalInfoStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              IGNITIA
            </h1>
          </div>
          <p className="text-muted-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Join the future of tech innovation
          </p>
        </div>

        <Card className="border-primary/20 shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {steps[currentStep].title}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                Step {Object.keys(steps).indexOf(currentStep) + 1} of {Object.keys(steps).length}
              </span>
            </div>
            <Progress value={steps[currentStep].progress} className="h-2" />
            <CardDescription>
              Create your Ignitia account in just a few steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {renderCurrentStep()}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}