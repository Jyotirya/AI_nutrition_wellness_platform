import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight, ArrowLeft, Armchair, Bike, Dumbbell, Zap } from 'lucide-react';
import { useEffect } from 'react';

const activityLevels = [
  {
    value: 'Sedentary',
    label: 'Sedentary',
    description: 'Little or no exercise',
    icon: Armchair,
    multiplier: '1.2x',
  },
  {
    value: 'Light',
    label: 'Lightly Active',
    description: 'Exercise 1-3 times/week',
    icon: Bike,
    multiplier: '1.375x',
  },
  {
    value: 'Moderate',
    label: 'Moderately Active',
    description: 'Exercise 4-5 times/week',
    icon: Dumbbell,
    multiplier: '1.55x',
  },
  {
    value: 'Very Active',
    label: 'Very Active',
    description: 'Intense exercise 6-7 times/week',
    icon: Zap,
    multiplier: '1.725x',
  },
];

export function Step3ActivityLevel() {
  const navigate = useNavigate();
  const { data, updateData, saveProgress } = useOnboarding();
  const [selected, setSelected] = useState(data.activityLevel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProgress({ activityLevel: selected, onboardingStep: 4 });
    navigate('/onboarding/step4');
  };
  useEffect(() => {
    setSelected(data.activityLevel);
    if (data.onboardingStep > 8 ) {
      navigate("/dashboard");
    }
  },[data]);

  return (
    <OnboardingLayout currentStep={3} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">What&apos;s Your Activity Level?</h1>
          <p className="text-gray-600">This helps us calculate your daily calorie needs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {activityLevels.map((level) => {
              const Icon = level.icon;
              return (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setSelected(level.value)}
                  className={`p-6 rounded-xl border-2 transition text-left ${
                    selected === level.value
                      ? 'border-lime-500 bg-lime-50'
                      : 'border-gray-200 hover:border-lime-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      selected === level.value
                        ? 'bg-lime-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={selected === level.value ? 'text-lime-700' : ''}>
                          {level.label}
                        </h3>
                        <span className="text-xs text-gray-500">{level.multiplier}</span>
                      </div>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/step2')}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-lime-500 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              disabled={!selected}
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
