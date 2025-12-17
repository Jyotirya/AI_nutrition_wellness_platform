import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight, ArrowLeft, TrendingDown, TrendingUp, Activity } from 'lucide-react';
import { useEffect } from 'react';

const goals = [
  {
    value: 'Weight Loss',
    label: 'Weight Loss',
    description: 'Lose weight and reduce body fat percentage',
    icon: TrendingDown,
    color: 'orange',
  },
  {
    value: 'Muscle Gain',
    label: 'Muscle Gain',
    description: 'Build muscle mass and increase strength',
    icon: TrendingUp,
    color: 'blue',
  },
  {
    value: 'Diabetes Control',
    label: 'Diabetes Control',
    description: 'Manage blood sugar and improve metabolic health',
    icon: Activity,
    color: 'purple',
  },
];

export function Step7GoalSelection() {
  const navigate = useNavigate();
  const { data, updateData, saveProgress} = useOnboarding();
  const [selected, setSelected] = useState(data.goal);

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    saveProgress({ goal: selected, onboardingStep: 8 });
    navigate('/onboarding/summary');
  };

  useEffect(() => {
    setSelected(data.goal);
    if (data.onboardingStep > 8 ) {
      navigate("/dashboard");
    }
  },[data]);


  return (
    <OnboardingLayout currentStep={7} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">What&apos;s Your Primary Goal?</h1>
          <p className="text-gray-600">This will help us create a personalized plan for you</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selected === goal.value;
              const colorClasses = {
                orange: {
                  border: 'border-orange-500',
                  bg: 'bg-orange-50',
                  iconBg: 'bg-orange-500',
                  text: 'text-orange-700',
                },
                blue: {
                  border: 'border-blue-500',
                  bg: 'bg-blue-50',
                  iconBg: 'bg-blue-500',
                  text: 'text-blue-700',
                },
                purple: {
                  border: 'border-purple-500',
                  bg: 'bg-purple-50',
                  iconBg: 'bg-purple-500',
                  text: 'text-purple-700',
                },
              }[goal.color]!;

              return (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setSelected(goal.value)}
                  className={`w-full p-6 rounded-xl border-2 transition text-left ${
                    isSelected
                      ? `${colorClasses.border} ${colorClasses.bg}`
                      : 'border-gray-200 hover:border-lime-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? colorClasses.iconBg : 'bg-gray-100'
                    } text-white`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl mb-1 ${isSelected ? colorClasses.text : ''}`}>
                        {goal.label}
                      </h3>
                      <p className="text-gray-600">{goal.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-6 bg-gradient-to-br from-lime-50 to-white rounded-xl border border-lime-200">
            <h3 className="mb-2">What happens next?</h3>
            <p className="text-sm text-gray-600">
              Based on your goal, we&apos;ll calculate your recommended daily calorie intake, macronutrient distribution, 
              and create a personalized meal plan and workout schedule to help you succeed.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/step6')}
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
