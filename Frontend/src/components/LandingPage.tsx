import { Link } from 'react-router-dom';
import { Activity, Target, Users, TrendingUp, Apple, Dumbbell, Heart } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lime-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center">
                <Apple className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl">Nutrigo</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-lime-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-lime-600 transition">How it Works</a>
              <a href="#about" className="text-gray-700 hover:text-lime-600 transition">About</a>
              <Link to="/dashboard" className="text-gray-700 hover:text-lime-600 transition">Dashboard</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="px-5 py-2 text-gray-700 hover:text-lime-600 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl mb-6">
              Start Your Health Journey with{' '}
              <span className="text-lime-500">Nutrigo</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Personalized nutrition plans, workout tracking, and health insights to help you achieve your wellness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <button className="px-8 py-4 bg-lime-500 text-white rounded-xl hover:bg-lime-600 transition shadow-lg shadow-lime-500/30">
                  Get Started Free
                </button>
              </Link>
              <Link to="/login">
                <button className="px-8 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-lime-500 transition">
                  Sign In
                </button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-lime-500" />
                <span>10k+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-lime-500" />
                <span>Trusted by Nutritionists</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1613637069737-2cce919a4ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZml0bmVzcyUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjUyNzI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthy lifestyle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-lime-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Weight Progress</div>
                  <div className="text-lime-600">-5 kg this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for nutrition, fitness, and wellness tracking</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-lime-50 to-white p-8 rounded-2xl border border-lime-100">
              <div className="w-14 h-14 bg-lime-500 rounded-xl flex items-center justify-center mb-4">
                <Apple className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-3">Smart Nutrition</h3>
              <p className="text-gray-600">
                Personalized meal plans based on your dietary preferences, allergies, and health goals. Track calories, macros, and nutrients effortlessly.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-3">Workout Tracking</h3>
              <p className="text-gray-600">
                Log your exercises, track progress, and get recommended workouts tailored to your fitness level and goals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-3">Health Insights</h3>
              <p className="text-gray-600">
                Monitor your weight, body fat percentage, and other health metrics with beautiful visualizations and actionable insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-lime-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How Nutrigo Works</h2>
            <p className="text-xl text-gray-600">Get started in minutes with our simple onboarding process</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1606859191214-25806e8e2423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFsJTIwcHJlcCUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NjUyNzI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Meal prep"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-lime-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl mb-2">Tell Us About Yourself</h3>
                  <p className="text-gray-600">Share your basic info, health metrics, and fitness goals through our guided onboarding.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-lime-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl mb-2">Get Your Personalized Plan</h3>
                  <p className="text-gray-600">Receive customized meal recommendations and workout routines based on your preferences.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-lime-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl mb-2">Track Your Progress</h3>
                  <p className="text-gray-600">Log meals, exercises, and watch your health metrics improve over time with detailed analytics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-lime-500 to-lime-600 rounded-3xl p-12 text-white shadow-2xl shadow-lime-500/30">
            <h2 className="text-4xl mb-4">Ready to Transform Your Health?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of users who have achieved their wellness goals with Nutrigo</p>
            <Link to="/signup">
              <button className="px-8 py-4 bg-white text-lime-600 rounded-xl hover:bg-gray-100 transition shadow-lg">
                Start Your Free Journey
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center">
                  <Apple className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">Nutrigo</span>
              </div>
              <p className="text-gray-400">Your personal health and nutrition companion</p>
            </div>
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-lime-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-lime-400 transition">About</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-lime-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nutrigo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}