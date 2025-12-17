import { Routes, Route, Navigate } from 'react-router-dom';
import { Step1BasicInfo } from './onboarding/Step1BasicInfo';
import { Step2HeightWeight } from './onboarding/Step2HeightWeight';
import { Step3ActivityLevel } from './onboarding/Step3ActivityLevel';
import { Step4BodyFat } from './onboarding/Step4BodyFat';
import { Step5ExerciseRoutine } from './onboarding/Step5ExerciseRoutine';
import { Step6FoodPreferences } from './onboarding/Step6FoodPreferences';
import { Step7GoalSelection } from './onboarding/Step7GoalSelection';
import { StepSummary } from './onboarding/StepSummary';

export function OnboardingFlow() {
  return (
      <Routes>
        <Route path="step1" element={<Step1BasicInfo />} />
        <Route path="step2" element={<Step2HeightWeight />} />
        <Route path="step3" element={<Step3ActivityLevel />} />
        <Route path="step4" element={<Step4BodyFat />} />
        <Route path="step5" element={<Step5ExerciseRoutine />} />
        <Route path="step6" element={<Step6FoodPreferences />} />
        <Route path="step7" element={<Step7GoalSelection />} />
        <Route path="summary" element={<StepSummary />} />
        <Route path="*" element={<Navigate to="step1" replace />} />
      </Routes>
  );
}
