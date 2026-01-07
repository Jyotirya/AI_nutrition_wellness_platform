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

export default function App() {
  return (
    <Router>
      <OnboardingProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding/*" element={<OnboardingFlow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/food-diary" element={<FoodDiary />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/health-insights" element={<HealthInsights />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </OnboardingProvider>
    </Router>
  );
}