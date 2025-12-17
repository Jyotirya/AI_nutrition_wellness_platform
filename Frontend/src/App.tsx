import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { MealPlan } from './components/MealPlan';
import { CalendarView } from './components/CalendarView';
import { FoodDiary } from './components/FoodDiary';
import { Exercises } from './components/Exercises';
import { HealthInsights } from './components/HealthInsights';
import { OnboardingProvider } from './components/onboarding/OnboardingContext';
import { ProtectedRoute, Alreadyloggedin} from './components/ProtectedRoute';
import { Profile } from './components/Profile';

export default function App() {
  return (
    <Router>
      <OnboardingProvider>
        <Routes>
          <Route path="/" element={
            <Alreadyloggedin>
            <LandingPage />
            </Alreadyloggedin>
            } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/onboarding/*"
            element={
              <ProtectedRoute>
                <OnboardingFlow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meal-plan"
            element={
              <ProtectedRoute>
                <MealPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/food-diary"
            element={
              <ProtectedRoute>
                <FoodDiary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercises"
            element={
              <ProtectedRoute>
                <Exercises />
              </ProtectedRoute>
            }
          />
          <Route
            path="/health-insights"
            element={
              <ProtectedRoute>
                <HealthInsights />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </OnboardingProvider>
    </Router>
  );
}