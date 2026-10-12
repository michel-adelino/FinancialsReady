export type OnboardingTheme = 'light' | 'dark';

export type OnboardingStepId = 'record' | 'insights' | 'budget';

export type OnboardingStep = {
  id: OnboardingStepId;
  theme: OnboardingTheme;
  overline: string;
  headline: string;
  description: string;
  ctaLabel: string;
  stepLabel: string;
  showSkip: boolean;
};
