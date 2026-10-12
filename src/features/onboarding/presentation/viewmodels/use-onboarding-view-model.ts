import { useMemo, useState } from 'react';

import type { OnboardingStep } from '@/features/onboarding/domain/entities/onboarding-step';
import { onboardingService } from '@/features/shared/di';

/** Holds onboarding step index and derived step UI state. */
export function useOnboardingViewModel() {
  const steps = useMemo(() => onboardingService.getSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);

  const step: OnboardingStep = steps[stepIndex] ?? steps[0];
  const isLast = stepIndex >= steps.length - 1;
  const activeDotIndex = stepIndex;

  const goNext = () => {
    if (isLast) return;
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  return {
    steps,
    step,
    stepIndex,
    isLast,
    activeDotIndex,
    goNext,
  };
}
