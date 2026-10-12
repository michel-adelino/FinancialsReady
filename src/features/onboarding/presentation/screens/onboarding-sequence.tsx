import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '@/core/theme';
import { OnboardingBenefit } from '@/features/onboarding/presentation/components/onboarding-benefit';
import { OnboardingFooter } from '@/features/onboarding/presentation/components/onboarding-footer';
import { OnboardingHeader } from '@/features/onboarding/presentation/components/onboarding-header';
import { BudgetIllustration } from '@/features/onboarding/presentation/components/illustrations/budget-illustration';
import { InsightsIllustration } from '@/features/onboarding/presentation/components/illustrations/insights-illustration';
import { RecordIllustration } from '@/features/onboarding/presentation/components/illustrations/record-illustration';
import { useOnboardingController } from '@/features/onboarding/presentation/controllers/use-onboarding-controller';

type OnboardingSequenceProps = {
  onComplete: () => void;
};

export function OnboardingSequence({ onComplete }: OnboardingSequenceProps) {
  const vm = useOnboardingController({ onComplete });
  const isDark = vm.step.theme === 'dark';

  return (
    <View
      style={[
        styles.overlay,
        { backgroundColor: isDark ? AppColors.splashBg : AppColors.background },
      ]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <OnboardingHeader
        theme={vm.step.theme}
        showSkip={vm.step.showSkip}
        onSkip={vm.onSkip}
      />

      <View style={styles.body}>
        {vm.step.id === 'record' ? <RecordIllustration /> : null}
        {vm.step.id === 'insights' ? <InsightsIllustration /> : null}
        {vm.step.id === 'budget' ? <BudgetIllustration /> : null}

        <OnboardingBenefit
          theme={vm.step.theme}
          overline={vm.step.overline}
          headline={vm.step.headline}
          description={vm.step.description}
        />
      </View>

      <OnboardingFooter
        theme={vm.step.theme}
        activeIndex={vm.activeDotIndex}
        total={vm.totalSteps}
        stepLabel={vm.step.stepLabel}
        ctaLabel={vm.step.ctaLabel}
        onPrimaryPress={vm.onPrimaryPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 90,
    elevation: 90,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
});
