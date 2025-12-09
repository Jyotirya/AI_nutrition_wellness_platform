import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { Check, User, Ruler, Weight, Activity, Dumbbell, Apple, Target, ArrowLeft } from 'lucide-react';

export function StepSummary() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  const handleFinish = () => {
    // In a real app, this would save the data and navigate to the dashboard
    navigate('/dashboard');
  };

  const bmi = data.height && data.weight 
    ? (parseFloat(data.weight) / Math.pow(parseFloat(data.height) / 100, 2)).toFixed(1)
    : 'N/A';

  return (
    <OnboardingLayout currentStep={7} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Review Your Profile</h1>
          <p className="text-gray-600">Make sure everything looks correct before we create your personalized plan</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Basic Information */}
          <div className="p-6 bg-gradient-to-br from-lime-50 to-white rounded-xl border border-lime-200">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-lime-600" />
              <h3>Basic Information</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span>{data.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age</span>
                <span>{data.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender</span>
                <span>{data.gender}</span>
              </div>
            </div>
          </div>

          {/* Body Measurements */}
          <div className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-200">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-orange-600" />
              <h3>Body Measurements</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Height</span>
                <span>{data.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight</span>
                <span>{data.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">BMI</span>
                <span>{bmi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Body Fat</span>
                <span>{data.bodyFat}%</span>
              </div>
            </div>
          </div>

          {/* Activity & Exercise */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-5 h-5 text-blue-600" />
              <h3>Activity & Exercise</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Activity Level</span>
                <span>{data.activityLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Workout Days</span>
                <span>{data.workoutDaysPerWeek} days/week</span>
              </div>
              <div>
                <span className="text-gray-600 block mb-1">Workout Types</span>
                <div className="flex flex-wrap gap-1">
                  {data.workoutTypes.map((type) => (
                    <span key={type} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Food Preferences */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Apple className="w-5 h-5 text-purple-600" />
              <h3>Food Preferences</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600 block mb-1">Diet Type</span>
                <div className="flex flex-wrap gap-1">
                  {data.dietType.map((type) => (
                    <span key={type} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-600 block mb-1">Taste Preferences</span>
                <div className="flex flex-wrap gap-1">
                  {data.tastePreferences.map((taste) => (
                    <span key={taste} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {taste}
                    </span>
                  ))}
                </div>
              </div>
              {data.allergies.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-1">Allergies</span>
                  <div className="flex flex-wrap gap-1">
                    {data.allergies.map((allergy) => (
                      <span key={allergy} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Primary Goal */}
        <div className="p-6 bg-gradient-to-br from-lime-500 to-lime-600 rounded-xl mb-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6" />
            <h3 className="text-xl">Your Primary Goal</h3>
          </div>
          <p className="text-2xl opacity-90">{data.goal}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/onboarding/step1')}
            className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-lime-500 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Edit
          </button>
          <button
            onClick={handleFinish}
            className="flex-1 py-4 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Finish Setup & Start Your Journey
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
}