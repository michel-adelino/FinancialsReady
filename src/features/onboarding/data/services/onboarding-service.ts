import type { OnboardingRepository } from '@/features/onboarding/data/repositories/onboarding-repository';
import type { OnboardingStep } from '@/features/onboarding/domain/entities/onboarding-step';

/** Application-facing API for onboarding. */
export class OnboardingService {
  constructor(private readonly onboardingRepository: OnboardingRepository) {}

  getSteps(): OnboardingStep[] {
    return this.onboardingRepository.getSteps();
  }

  isCompletedSync(): boolean {
    return this.onboardingRepository.isCompletedSync();
  }

  complete(): void {
    this.onboardingRepository.complete();
  }
}
