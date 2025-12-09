import { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
  // Step 1
  name: string;
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
  workoutTypes: string[];
  workoutDaysPerWeek: number;
  // Step 6
  dietType: string[];
  tastePreferences: string[];
  allergies: string[];
  // Step 7
  goal: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    bodyFat: 20,
    workoutTypes: [],
    workoutDaysPerWeek: 3,
    dietType: [],
    tastePreferences: [],
    allergies: [],
    goal: '',
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData }}>
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
