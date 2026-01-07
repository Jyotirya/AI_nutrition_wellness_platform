import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function Step4BodyFat() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [bodyFat, setBodyFat] = useState(data.bodyFat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ bodyFat });
    navigate('/onboarding/step5');
  };

  const handleSkip = () => {
    navigate('/onboarding/step5');
  };

  return (
    <OnboardingLayout currentStep={4} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Body Fat Percentage</h1>
              <p className="text-gray-600">Optional: This helps us provide more accurate recommendations</p>
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="text-gray-500 hover:text-lime-600 transition underline"
            >
              Skip
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm text-gray-700">
                Body Fat Percentage
              </label>
              <span className="text-3xl text-lime-600">{bodyFat}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="0.5"
              value={bodyFat}
              onChange={(e) => setBodyFat(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lime-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>5%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
            <h3 className="mb-3">Reference Ranges</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Athletes (Male)</span>
                <span>6-13%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Athletes (Female)</span>
                <span>14-20%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fitness (Male)</span>
                <span>14-17%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fitness (Female)</span>
                <span>21-24%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average (Male)</span>
                <span>18-24%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average (Female)</span>
                <span>25-31%</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/step3')}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-lime-500 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 flex items-center justify-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}