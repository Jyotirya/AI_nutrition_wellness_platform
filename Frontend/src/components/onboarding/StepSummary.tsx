import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './OnboardingContext';
import { OnboardingLayout } from './OnboardingLayout';
import { Check, User, Ruler, Weight, Activity, Dumbbell, Apple, Target, ArrowLeft } from 'lucide-react';
import { register, login, updateUserDetails, generateWeeklyPlan } from '@/libapis/api';

export function StepSummary() {
  const navigate = useNavigate();
  const { data, resetData } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (!data.email || !data.password) {
      setError('Missing email or password from signup. Please restart onboarding.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const email = data.email.trim();
      const password = data.password;

      // 1) Try to register first (for new users). If email exists, we’ll fall back to login.
      let tokens;
      const [first_name = '', ...rest] = data.name.trim().split(' ');
      const last_name = rest.join(' ');

      try {
        await register({
          email,
          password,
          password2: password,
          first_name,
          last_name,
        });
      } catch (regErr: any) {
        const regStatus = regErr?.response?.status;
        const errData = regErr?.response?.data || {};

        // Check if email already exists - handle various response formats
        const emailError = errData.email;
        const isEmailExists = regStatus === 400 && (
          (Array.isArray(emailError) && emailError.some((e: string) => e.toLowerCase().includes('already exists') || e.toLowerCase().includes('already registered'))) ||
          (typeof emailError === 'string' && (emailError.toLowerCase().includes('already exists') || emailError.toLowerCase().includes('already registered')))
        );

        if (!isEmailExists) {
          throw regErr; // unexpected registration error
        }
        // Email already exists -> proceed to login with provided password
      }

      // 2) Log in (works for both newly-registered and existing-with-same-password)
      try {
        const loginResp = await login({ email, password });
        tokens = loginResp.data;
      } catch (loginErr: any) {
        const loginStatus = loginErr?.response?.status;
        const errData = loginErr?.response?.data || {};

        // Handle invalid credentials (wrong password for existing account)
        const passwordError = errData.password;
        const isInvalidCredentials = loginStatus === 400 && (
          (typeof passwordError === 'string' && passwordError.toLowerCase().includes('invalid')) ||
          (Array.isArray(passwordError) && passwordError.some((e: string) => e.toLowerCase().includes('invalid')))
        );
        
        if (isInvalidCredentials) {
          setError('This email is already registered with a different password. Please log in instead.');
          setLoading(false);
          return;
        }

        // Handle user not found
        const emailError = errData.email;
        const isUserNotFound = loginStatus === 400 && (
          (typeof emailError === 'string' && emailError.toLowerCase().includes('not found')) ||
          (Array.isArray(emailError) && emailError.some((e: string) => e.toLowerCase().includes('not found')))
        );
        
        if (isUserNotFound) {
          setError('Could not find this user after registration attempt. Please retry.');
          setLoading(false);
          return;
        }
        
        throw loginErr;
      }

      // 2) Store tokens
      localStorage.setItem('access', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);

      // 3) Save user details
      await updateUserDetails({
        age: data.age ? Number(data.age) : null,
        gender: data.gender || null,
        height: data.height ? Number(data.height) : null,
        weight: data.weight ? Number(data.weight) : null,
        activity_level: data.activityLevel || null,
        body_fat: data.bodyFat ?? null,
        exercise: data.workoutTypes || null,
        workout_frequency: data.workoutDaysPerWeek ?? null,
        food_preference: data.dietType || null,
        allergies: data.allergies?.join(', ') || null,
        cuisine: data.cuisinePreferences?.join(', ') || null,
        goal: data.goal || null,
        onboarding_step: 7,
      });

      // 4) Generate meal plan (non-blocking - don't fail onboarding if meal plan fails)
      try {
        await generateWeeklyPlan();
      } catch (mealPlanErr) {
        console.warn('Could not generate meal plan during onboarding:', mealPlanErr);
        // Continue to dashboard even if meal plan generation fails
      }

      // 5) Clear onboarding seed data
      resetData();

      navigate('/dashboard');
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.email ||
        err?.response?.data?.password ||
        err?.message ||
        'Failed to complete onboarding';
      setError(Array.isArray(msg) ? msg.join(', ') : String(msg));
    } finally {
      setLoading(false);
    }
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
              <div className="flex justify-between">
                <span className="text-gray-600">Workout Type</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {data.workoutTypes}
                </span>
              </div>
            </div>
          </div>

          {/* Food Preferences & Cuisine */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Apple className="w-5 h-5 text-purple-600" />
              <h3>Food Preferences & Cuisine</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Food Type</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                  {data.dietType}
                </span>
              </div>
              <div>
                <span className="text-gray-600 block mb-1">Cuisines</span>
                <div className="flex flex-wrap gap-1">
                  {data.cuisinePreferences.map((cuisine) => (
                    <span key={cuisine} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
              {data.allergies.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-1">Allergies</span>
                  <div className="flex flex-wrap gap-1">
                    {data.allergies.map((allergy) => (
                      <span key={allergy} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
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
            disabled={loading}
            className="flex-1 py-4 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition shadow-lg shadow-lime-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Check className="w-5 h-5" />
            {loading ? 'Finishing setup...' : 'Finish Setup & Start Your Journey'}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </OnboardingLayout>
  );
}