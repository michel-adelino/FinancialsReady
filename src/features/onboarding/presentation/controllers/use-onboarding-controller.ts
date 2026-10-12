import { useCallback } from 'react';

import { useOnboardingViewModel } from '@/features/onboarding/presentation/viewmodels/use-onboarding-view-model';
import { onboardingService } from '@/features/shared/di';

type UseOnboardingControllerOptions = {
  onComplete: () => void;
};

/** Handles onboarding intents (next / skip / get started). */
export function useOnboardingController({
  onComplete,
}: UseOnboardingControllerOptions) {
  const viewModel = useOnboardingViewModel();

  const finish = useCallback(() => {
    onboardingService.complete();
    onComplete();
  }, [onComplete]);

  const onPrimaryPress = useCallback(() => {
    if (viewModel.isLast) {
      finish();
      return;
    }
    viewModel.goNext();
  }, [finish, viewModel]);

  const onSkip = useCallback(() => {
    finish();
  }, [finish]);

  return {
    step: viewModel.step,
    stepIndex: viewModel.stepIndex,
    activeDotIndex: viewModel.activeDotIndex,
    totalSteps: viewModel.steps.length,
    onPrimaryPress,
    onSkip,
  };
}
