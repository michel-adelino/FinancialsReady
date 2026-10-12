import type { OnboardingStep } from '@/features/onboarding/domain/entities/onboarding-step';

export const MOCK_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'record',
    theme: 'light',
    overline: 'RECORD WITH EASE',
    headline: 'Money in. Money out.\nAll in one place.',
    description:
      'Save expenses and income as life happens. Every little entry brings more clarity.',
    ctaLabel: 'Next',
    stepLabel: '01 / 03',
    showSkip: true,
  },
  {
    id: 'insights',
    theme: 'light',
    overline: 'SEE THE BIG PICTURE',
    headline: 'Less guesswork.\nMore understanding.',
    description:
      'See your dashboard, spot spending trends, and know where your money goes.',
    ctaLabel: 'Next',
    stepLabel: '02 / 03',
    showSkip: true,
  },
  {
    id: 'budget',
    theme: 'dark',
    overline: 'MAKE ROOM FOR WHAT MATTERS',
    headline: 'Your budget.\nYour pace.',
    description:
      'Set spending limits that fit your life. See what’s left and stay on track with confidence.',
    ctaLabel: 'Get started',
    stepLabel: '03 / 03',
    showSkip: false,
  },
];
