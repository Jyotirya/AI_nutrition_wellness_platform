import { createContext, useContext, useState, ReactNode } from "react";
import { updateUserDetails, getProfile } from "@/libapis/api";
import { useEffect } from "react";

interface OnboardingData {
  name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  bodyFat: number;
  workoutTypes: string[];
  workoutDaysPerWeek: number;               
  dietType: string[];
  tastePreferences: string[];
  allergies: string[];
  goal: string;
  onboardingStep: number;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  saveProgress: (stepData: Partial<OnboardingData>) => Promise<void>;
  loadProfile: () => Promise<void>;
  isRegistered: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    bodyFat: 20,
    workoutTypes: [],
    workoutDaysPerWeek: 3,
    dietType: [],
    tastePreferences: [],
    allergies: [],
    goal: "",
    onboardingStep: 0,
  });
  const [isRegistered, setIsRegistered] = useState(false);

  


  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      // Fetch and hydrate context
      loadProfile();
    }
    // eslint-disable-next-line
  }, []);

  // Save progress to backend and update local state
  const saveProgress = async (stepData: Partial<OnboardingData>): Promise<void> => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.log("No auth token, skipping save");
      return;
    }

    // Merge with current data
    const mergedData = { ...data, ...stepData };
    
    // Update local state first
    updateData(stepData);

    try {
      await updateUserDetails({
        age: mergedData.age ? Number(mergedData.age) : null,
        gender: mergedData.gender || null,
        height: mergedData.height ? Number(mergedData.height) : null,
        weight: mergedData.weight ? Number(mergedData.weight) : null,
        activity_level: mergedData.activityLevel || null,
        exercise: mergedData.workoutTypes?.join(", ") || null,
        food_preference: mergedData.dietType?.join(", ") || null,
        allergies: mergedData.allergies?.join(", ") || null,
        goal: mergedData.goal || null,
        onboarding_step: stepData.onboardingStep ?? mergedData.onboardingStep,
      });
      console.log("✅ Progress saved:", stepData);
    } catch (err) {
      console.error("❌ Error saving progress:", err);
      throw err; // Re-throw so caller can handle
    }
  };

  // Load profile from backend
  const loadProfile = async (): Promise<void> => {
    try {
      const { data } = await getProfile();
      setIsRegistered(true);

      const details = data.details || {};
      const user = data.user || {};
      
      updateData({
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        email: user.email || "",
        age: details.age?.toString() || "",
        gender: details.gender || "",
        height: details.height?.toString() || "",
        weight: details.weight?.toString() || "",
        activityLevel: details.activity_level || "",
        workoutTypes: details.exercise?.split(",").map((s: string) => s.trim()).filter(Boolean) || [],
        dietType: details.food_preference?.split(",").map((s: string) => s.trim()).filter(Boolean) || [],
        allergies: details.allergies?.split(",").map((s: string) => s.trim()).filter(Boolean) || [],
        goal: details.goal || "",
        onboardingStep: details.onboarding_step || 0,
      });
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{ data, updateData, saveProgress, loadProfile, isRegistered }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}