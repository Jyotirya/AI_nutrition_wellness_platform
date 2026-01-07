import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight, ArrowLeft, Leaf, Beef, Egg, Globe, AlertCircle } from 'lucide-react';

const foodTypes = [
  { value: 'Vegetarian', label: 'Vegetarian', icon: Leaf },
  { value: 'Non-Vegetarian', label: 'Non-Vegetarian', icon: Beef },
  { value: 'Eggetarian', label: 'Eggetarian', icon: Egg },
];

const cuisineOptions = [
  { value: 'North Indian', label: 'North Indian', flag: '🍛' },
  { value: 'South Indian', label: 'South Indian', flag: '🥘' },
  { value: 'East Indian', label: 'East Indian', flag: '🍲' },
  { value: 'West Indian', label: 'West Indian', flag: '🥗' },
  { value: 'Continental', label: 'Continental', flag: '🍝' },
];

const allergyOptions = [
  'Gluten',
  'Caffeine',
  'Chickpea',
  'Cinnamon',
  'Citrus',
  'Dairy',
  'Egg',
  'Fish',
  'Garlic',
  'Legume',
  'Mushroom',
  'Nightshade',
  'No Allergies',
  'Nut',
  'Onion',
  'Peanut',
  'Pork',
  'Rice',
  'Seafood',
  'Sesame',
  'Shellfish',
  'Soy',
];

export function Step6FoodPreferences() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [selectedType, setSelectedType] = useState<string>(data.dietType);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(data.cuisinePreferences);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(data.allergies);

  const selectFoodType = (type: string) => {
    setSelectedType(type);
  };

  const toggleCuisine = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
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
      dietType: selectedType, 
      tastePreferences: [], 
      allergies: selectedAllergies,
      cuisinePreferences: selectedCuisines
    });
    navigate('/onboarding/step7');
  };

  return (
    <OnboardingLayout currentStep={6} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">Food Preferences</h1>
          <p className="text-gray-600 text-sm md:text-base">Select your food type and favorite cuisines</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Food Type Selection */}
          <div>
            <h3 className="mb-4">Food Type</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {foodTypes.map((food) => {
                const Icon = food.icon;
                const isSelected = selectedType === food.value;
                return (
                  <button
                    key={food.value}
                    type="button"
                    onClick={() => selectFoodType(food.value)}
                    className={`p-6 rounded-xl border-2 transition ${
                      isSelected
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-gray-200 hover:border-lime-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-lime-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className={`text-base ${isSelected ? 'text-lime-700' : ''}`}>
                        {food.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cuisine Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-lime-500" />
              <h3>Cuisine Preferences</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Select your favorite cuisines (multiple allowed)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cuisineOptions.map((cuisine) => {
                const isSelected = selectedCuisines.includes(cuisine.value);
                return (
                  <button
                    key={cuisine.value}
                    type="button"
                    onClick={() => toggleCuisine(cuisine.value)}
                    className={`p-4 rounded-xl border-2 transition ${
                      isSelected
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-gray-200 hover:border-lime-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-3xl md:text-4xl">{cuisine.flag}</div>
                      <span className={`text-xs md:text-sm text-center ${
                        isSelected ? 'text-lime-700' : 'text-gray-700'
                      }`}>
                        {cuisine.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Allergy Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-lime-500" />
              <h3>Allergy Preferences</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Select any allergies you have (multiple allowed)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allergyOptions.map((allergy) => {
                const isSelected = selectedAllergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => toggleAllergy(allergy)}
                    className={`p-4 rounded-xl border-2 transition ${
                      isSelected
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-gray-200 hover:border-lime-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className={`text-xs md:text-sm text-center ${
                        isSelected ? 'text-lime-700' : 'text-gray-700'
                      }`}>
                        {allergy}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/step5')}
              className="px-4 md:px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-lime-500 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden md:inline">Back</span>
            </button>
            <button
              type="submit"
              disabled={!selectedType || selectedCuisines.length === 0}
              className="flex-1 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}