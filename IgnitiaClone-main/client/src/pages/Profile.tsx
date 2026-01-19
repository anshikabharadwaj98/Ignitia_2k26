import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, GraduationCap, Shield, Calendar, Edit } from 'lucide-react';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            User Profile
          </h1>
          <p className="text-muted-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Manage your Ignitia account information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {user.name}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                {user.is_admin && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                )}
                <Badge variant="outline">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your personal and academic details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {user.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {user.email}
                    {user.is_email_verified && (
                      <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="w-4 h-4" />
                    Contact Number
                  </Label>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    +91 {user.contact_number}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <GraduationCap className="w-4 h-4" />
                    College
                  </Label>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {user.college === 'PSIT' ? 'Pranveer Singh Institute of Technology' : user.college}
                  </p>
                </div>

                {user.roll_number && (
                  <div className="space-y-2 md:col-span-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      Roll Number
                    </Label>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      {user.roll_number}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    Member Since
                  </Label>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4" />
                    Account Type
                  </Label>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {user.is_admin ? 'Administrator' : 'Student'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {user.is_admin && (
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <Shield className="w-5 h-5" />
                Admin Access
              </CardTitle>
              <CardDescription>
                You have administrative privileges for Ignitia 2K25
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={() => setLocation('/admin')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Access Admin Panel
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function Label({ children, className = "", ...props }: any) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  );
}