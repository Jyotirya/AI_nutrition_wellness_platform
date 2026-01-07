import { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { getProfile } from '@/libapis/api';

interface OnboardingData {
  // Step 1
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  // Step 2
  height: string;
  weight: string;
  // Step 3
  activityLevel: string;
  // Step 4
  bodyFat: number;
  // Step 5
  workoutTypes: string;
  workoutDaysPerWeek: number;
  // Step 6
  dietType: string;
  tastePreferences: string[];
  allergies: string[];
  cuisinePreferences: string[];
  // Step 7
  goal: string;
}

const defaultOnboardingData: OnboardingData = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  activityLevel: '',
  bodyFat: 20,
  workoutTypes: '',
  workoutDaysPerWeek: 3,
  dietType: '',
  tastePreferences: [],
  allergies: [],
  cuisinePreferences: [],
  goal: '',
};

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  resetData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const seed = (() => {
    try {
      const raw = localStorage.getItem('onboarding_seed');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  })();

  const [data, setData] = useState<OnboardingData>({
    ...defaultOnboardingData,
    name: seed.name || '',
    email: seed.email || '',
    password: seed.password || '',
  });

  const updateData = useCallback((newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem('onboarding_seed');
    setData(defaultOnboardingData);
  }, []);

  // Persist key signup/onboarding fields locally so a refresh keeps email/name/password
  useEffect(() => {
    try {
      localStorage.setItem(
        'onboarding_seed',
        JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );
    } catch {
      /* ignore */
    }
  }, [data.name, data.email, data.password]);

  // Hydrate from backend profile if a token exists (e.g., after login/refresh)
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    (async () => {
      try {
        const { data: profile } = await getProfile();
        const user = profile.user || {};
        const details = profile.details || {};
        const step = details.onboarding_step ?? 0;

        setData((prev) => {
          // If onboarding not finished yet, avoid overriding user-entered blanks with backend defaults
          const shouldHydrateAll = step >= 7;
          return {
            ...prev,
            name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || prev.name,
            email: user.email || prev.email,
            // Only hydrate detail fields when onboarding finished
            age: shouldHydrateAll ? (details.age?.toString() || prev.age) : prev.age,
            gender: shouldHydrateAll ? (details.gender || prev.gender) : prev.gender,
            height: shouldHydrateAll ? (details.height?.toString() || prev.height) : prev.height,
            weight: shouldHydrateAll ? (details.weight?.toString() || prev.weight) : prev.weight,
            activityLevel: shouldHydrateAll ? (details.activity_level || prev.activityLevel) : prev.activityLevel,
            bodyFat: shouldHydrateAll ? (details.body_fat ?? prev.bodyFat) : prev.bodyFat,
            workoutTypes: shouldHydrateAll ? (details.exercise || prev.workoutTypes) : prev.workoutTypes,
            workoutDaysPerWeek: shouldHydrateAll ? (details.workout_frequency ?? prev.workoutDaysPerWeek) : prev.workoutDaysPerWeek,
            dietType: shouldHydrateAll ? (details.food_preference || prev.dietType) : prev.dietType,
            tastePreferences: prev.tastePreferences,
            allergies: shouldHydrateAll && details.allergies
              ? details.allergies.split(',').map((a: string) => a.trim()).filter(Boolean)
              : prev.allergies,
            cuisinePreferences: shouldHydrateAll && details.cuisine
              ? details.cuisine.split(',').map((c: string) => c.trim()).filter(Boolean)
              : prev.cuisinePreferences,
            goal: shouldHydrateAll ? (details.goal || prev.goal) : prev.goal,
          };
        });
      } catch (err) {
        // Fail silently; user may not be logged in yet
        console.warn('Could not load profile', err);
      }
    })();
  }, []);

  const value = useMemo(() => ({ data, updateData, resetData }), [data, updateData, resetData]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}