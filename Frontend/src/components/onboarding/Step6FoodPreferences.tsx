import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight, ArrowLeft, Leaf, Fish, Beef, Milk, ShieldAlert } from 'lucide-react';

const dietTypes = [
  { value: 'Omnivore', label: 'Omnivore', icon: Beef },
  { value: 'Vegetarian', label: 'Vegetarian', icon: Leaf },
  { value: 'Vegan', label: 'Vegan', icon: Leaf },
  { value: 'Pescatarian', label: 'Pescatarian', icon: Fish },
  { value: 'Keto', label: 'Keto', icon: Beef },
  { value: 'Paleo', label: 'Paleo', icon: Beef },
];

const tasteOptions = [
  'Sweet', 'Savory', 'Spicy', 'Sour', 'Bitter', 'Umami'
];

const commonAllergies = [
  'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 'Fish', 'Shellfish'
];

export function Step6FoodPreferences() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [selectedDiet, setSelectedDiet] = useState<string[]>(data.dietType);
  const [selectedTastes, setSelectedTastes] = useState<string[]>(data.tastePreferences);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(data.allergies);

  const toggleDiet = (diet: string) => {
    if (selectedDiet.includes(diet)) {
      setSelectedDiet(selectedDiet.filter((d) => d !== diet));
    } else {
      setSelectedDiet([...selectedDiet, diet]);
    }
  };

  const toggleTaste = (taste: string) => {
    if (selectedTastes.includes(taste)) {
      setSelectedTastes(selectedTastes.filter((t) => t !== taste));
    } else {
      setSelectedTastes([...selectedTastes, taste]);
    }
  };

  const toggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter((a) => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({
      dietType: selectedDiet,
      tastePreferences: selectedTastes,
      allergies: selectedAllergies,
    });
    navigate('/onboarding/step7');
  };

  return (
    <OnboardingLayout currentStep={6} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Food Preferences</h1>
          <p className="text-gray-600">Tell us about your dietary preferences and restrictions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="mb-4">Diet Type</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {dietTypes.map((diet) => {
                const Icon = diet.icon;
                const isSelected = selectedDiet.includes(diet.value);
                return (
                  <button
                    key={diet.value}
                    type="button"
                    onClick={() => toggleDiet(diet.value)}
                    className={`p-4 rounded-xl border-2 transition ${
                      isSelected
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-gray-200 hover:border-lime-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-lime-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-lime-700' : ''}`}>
                        {diet.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4">Taste Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {tasteOptions.map((taste) => {
                const isSelected = selectedTastes.includes(taste);
                return (
                  <button
                    key={taste}
                    type="button"
                    onClick={() => toggleTaste(taste)}
                    className={`px-4 py-2 rounded-full border-2 transition ${
                      isSelected
                        ? 'border-lime-500 bg-lime-50 text-lime-700'
                        : 'border-gray-200 hover:border-lime-300'
                    }`}
                  >
                    {taste}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              <h3>Allergies & Restrictions</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {commonAllergies.map((allergy) => {
                const isSelected = selectedAllergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-4 py-2 rounded-lg border-2 transition text-left ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {allergy}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/step5')}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-lime-500 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              disabled={selectedDiet.length === 0}
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
