import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowRight } from 'lucide-react';

export function Step1BasicInfo() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [formData, setFormData] = useState({
    name: data.name,
    age: data.age,
    gender: data.gender,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(formData);
    navigate('/onboarding/step2');
  };

  return (
    <OnboardingLayout currentStep={1} totalSteps={7}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Let&apos;s Get to Know You</h1>
          <p className="text-gray-600">Tell us a bit about yourself to personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm mb-2 text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition"
              placeholder="Enter your age"
              min="13"
              max="120"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-3 text-gray-700">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Other'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender })}
                  className={`py-3 px-4 rounded-lg border-2 transition ${
                    formData.gender === gender
                      ? 'border-lime-500 bg-lime-50 text-lime-700'
                      : 'border-gray-200 hover:border-lime-300'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.name || !formData.age || !formData.gender}
            className="w-full py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </OnboardingLayout>
  );
}