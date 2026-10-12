import type { OnboardingStep } from '@/features/onboarding/domain/entities/onboarding-step';

export interface OnboardingRepository {
  getSteps(): OnboardingStep[];
  isCompletedSync(): boolean;
  complete(): void;
}
