import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Apple } from 'lucide-react';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function OnboardingLayout({ children, currentStep, totalSteps }: OnboardingLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-white">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 inline-flex">
          <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center">
            <Apple className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl">Nutrigo</span>
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        {children}
      </div>
    </div>
  );
}
