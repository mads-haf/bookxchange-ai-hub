
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Book } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to BookXchange!",
        variant: "default",
      });
      navigate('/');
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
        variant: "default",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <Book className="h-12 w-12 text-bookxchange-primary mb-2" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-bookxchange-dark">
              Welcome to BookXchange
            </h1>
            <p className="text-center text-bookxchange-dark/70 mt-2">
              Login or register to start trading books
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link to="/reset-password" className="text-xs text-bookxchange-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bookxchange-dark/50"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-bookxchange-primary hover:bg-bookxchange-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <Input
                      id="register-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bookxchange-dark/50"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-bookxchange-primary hover:bg-bookxchange-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 pt-6 border-t border-bookxchange-primary/10 text-center text-sm text-bookxchange-dark/70">
            By continuing, you agree to BookXchange's{' '}
            <Link to="/terms" className="text-bookxchange-primary hover:underline">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-bookxchange-primary hover:underline">Privacy Policy</Link>.
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
