import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Apple, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { login, getUserDetails } from '@/lib/api';
import { useOnboarding } from './onboarding/OnboardingContext';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateData } = useOnboarding();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      
      // Call login API
      const { data: tokens } = await login({
        email: formData.email,
        password: formData.password,
      });
      
      // Store tokens
      localStorage.setItem('access', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);

      const { data: details } = await getUserDetails();
      const step = details.onboarding_step ?? 0;
      // 4. Navigate based on onboarding progress
      if (step > 8) {
        // Onboarding complete

        navigate('/dashboard');
      } else if (step === 0) {
        // Not started
        navigate('/onboarding/step1');
      } else {
        // Resume from current step
        navigate(`/onboarding/step${step}`);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Login failed. Please try again.');
      }
      console.log('Error response:', err.response?.data);  // ← See what went wrong
      console.log('Error status:', err.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 inline-flex">
          <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center">
            <Apple className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl">Nutrigo</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-lime-500 focus:ring-lime-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-lime-600 hover:text-lime-700">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-lime-600 hover:text-lime-700">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="py-6 px-4">
        <div className="max-w-md mx-auto flex justify-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-lime-600 transition">Privacy Policy</a>
          <span className="text-gray-300">•</span>
          <a href="#" className="hover:text-lime-600 transition">Terms of Service</a>
          <span className="text-gray-300">•</span>
          <a href="#" className="hover:text-lime-600 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}
