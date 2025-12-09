import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight, ArrowLeft, Dumbbell, Bike, PersonStanding, Waves, Mountain, Box } from 'lucide-react';

const workoutTypes = [
  { value: 'Strength Training', label: 'Strength Training', icon: Dumbbell },
  { value: 'Cardio', label: 'Cardio', icon: Bike },
  { value: 'Yoga', label: 'Yoga', icon: PersonStanding },
  { value: 'Swimming', label: 'Swimming', icon: Waves },
  { value: 'Hiking', label: 'Hiking', icon: Mountain },
  { value: 'CrossFit', label: 'CrossFit', icon: Box },
];

export function Step5ExerciseRoutine() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(data.workoutTypes);
  const [daysPerWeek, setDaysPerWeek] = useState(data.workoutDaysPerWeek);

  const toggleWorkoutType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ workoutTypes: selectedTypes, workoutDaysPerWeek: daysPerWeek });
    navigate('/onboarding/step6');
  };

  return (
    <OnboardingLayout currentStep={5} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Your Exercise Routine</h1>
          <p className="text-gray-600">Select the types of workouts you enjoy and how often you exercise</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="mb-4">Workout Types</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {workoutTypes.map((workout) => {
                const Icon = workout.icon;
                const isSelected = selectedTypes.includes(workout.value);
                return (
                  <button
                    key={workout.value}
                    type="button"
                    onClick={() => toggleWorkoutType(workout.value)}
                    className={`p-4 rounded-xl border-2 transition ${
                      isSelected
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-gray-200 hover:border-lime-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-lime-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-lime-700' : ''}`}>
                        {workout.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>Days Per Week</h3>
              <span className="text-3xl text-lime-600">{daysPerWeek}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDaysPerWeek(day)}
                  className={`flex-1 py-3 rounded-lg border-2 transition ${
                    daysPerWeek === day
                      ? 'border-lime-500 bg-lime-50 text-lime-700'
                      : 'border-gray-200 hover:border-lime-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/step4')}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-lime-500 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              disabled={selectedTypes.length === 0}
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
