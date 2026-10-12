import { MOCK_ONBOARDING_STEPS } from '@/features/onboarding/data/datasources/mock-onboarding-steps';
import type { OnboardingRepository } from '@/features/onboarding/data/repositories/onboarding-repository';
import type { OnboardingStep } from '@/features/onboarding/domain/entities/onboarding-step';

export class OnboardingRepositoryImpl implements OnboardingRepository {
  private completed = false;

  getSteps(): OnboardingStep[] {
    return MOCK_ONBOARDING_STEPS.map((step) => ({ ...step }));
  }

  isCompletedSync(): boolean {
    return this.completed;
  }

  complete(): void {
    this.completed = true;
  }
}
