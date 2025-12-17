import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight, ArrowLeft, Ruler, Weight } from 'lucide-react';
import { useEffect } from 'react';

export function Step2HeightWeight() {
  const navigate = useNavigate();
  const { data, saveProgress } = useOnboarding();
  const [formData, setFormData] = useState({
    height: data.height,
    weight: data.weight,
    onboardingStep: 3,
  });
  useEffect(() => {
    setFormData({
      height: data.height,
      weight: data.weight,
      onboardingStep: 3,
    });
    if (data.onboardingStep > 8 ) {
      navigate("/dashboard");
    }
  },[data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProgress(formData);
    navigate('/onboarding/step3');
  };

  const bmi = formData.height && formData.weight 
    ? (parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)
    : null;

  return (
    <OnboardingLayout currentStep={2} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Your Body Measurements</h1>
          <p className="text-gray-600">This helps us calculate your BMI and personalize recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="height" className="block text-sm mb-2 text-gray-700">
              Height (cm)
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id="height"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 170"
                min="100"
                max="250"
                step="0.1"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm mb-2 text-gray-700">
              Weight (kg)
            </label>
            <div className="relative">
              <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 70"
                min="30"
                max="300"
                step="0.1"
                required
              />
            </div>
          </div>

          {bmi && (
            <div className="p-6 bg-gradient-to-br from-lime-50 to-white rounded-xl border border-lime-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Your BMI</p>
                <p className="text-4xl text-lime-600 mb-2">{bmi}</p>
                <p className="text-sm text-gray-600">
                  {parseFloat(bmi) < 18.5 ? 'Underweight' :
                   parseFloat(bmi) < 25 ? 'Normal weight' :
                   parseFloat(bmi) < 30 ? 'Overweight' : 'Obese'}
                </p>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-lime-500 transition-all duration-300"
                  style={{ width: `${Math.min((parseFloat(bmi) / 40) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/step1')}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-lime-500 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              disabled={!formData.height || !formData.weight}
              className="flex-1 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
