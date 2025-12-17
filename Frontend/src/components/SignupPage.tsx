import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Apple, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { register, login } from '@/lib/api';

export function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      await register({
            email: formData.email,
            password: formData.password,
            password2: formData.confirmPassword,
            first_name: formData.name,
            last_name: "",
          });
          const { data: tokens } = await login({
            email: formData.email,
            password: formData.password,
          });
          localStorage.setItem("access", tokens.access);
          localStorage.setItem("refresh", tokens.refresh);
      
      // Navigate to first onboarding step after successful registration
      navigate('/onboarding/step1');
      
    } catch (err: any) {
      // Handle errors from backend
      if (err.response?.data?.email) {
        setError(err.response.data.email[0]); // "A user with this email already exists."
      } else if (err.response?.data?.password) {
        setError(err.response.data.password[0]);
      } else {
        setError('Registration failed. Please try again.');
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

      {/* Signup Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl mb-2">Create Your Account</h1>
              <p className="text-gray-600">Start your journey to better health today</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    required
                    minLength={8}
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-lime-500 focus:ring-lime-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-lime-600 hover:text-lime-700">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-lime-600 hover:text-lime-700">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-lime-600 hover:text-lime-700">
                  Sign in
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