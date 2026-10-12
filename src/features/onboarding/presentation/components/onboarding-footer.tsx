import { ArrowRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { OnboardingTheme } from '@/features/onboarding/domain/entities/onboarding-step';
import { OnboardingStepIndicator } from '@/features/onboarding/presentation/components/onboarding-step-indicator';

type OnboardingFooterProps = {
  theme: OnboardingTheme;
  activeIndex: number;
  total: number;
  stepLabel: string;
  ctaLabel: string;
  onPrimaryPress: () => void;
};

export function OnboardingFooter({
  theme,
  activeIndex,
  total,
  stepLabel,
  ctaLabel,
  onPrimaryPress,
}: OnboardingFooterProps) {
  const insets = useSafeAreaInsets();
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.wrap,
        { paddingBottom: Math.max(insets.bottom, 16) },
      ]}>
      <OnboardingStepIndicator
        theme={theme}
        activeIndex={activeIndex}
        total={total}
        stepLabel={stepLabel}
      />
      <Pressable
        accessibilityRole="button"
        onPress={onPrimaryPress}
        style={[styles.button, isDark && styles.buttonDark]}>
        <Text style={[styles.buttonLabel, isDark && styles.buttonLabelDark]}>
          {ctaLabel}
        </Text>
        <ArrowRight
          size={18}
          color={isDark ? AppColors.balanceCard : AppColors.white}
          strokeWidth={2.4}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 28,
    paddingTop: 12,
    gap: 18,
  },
  button: {
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: AppColors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  buttonDark: {
    backgroundColor: AppColors.splashAccent,
  },
  buttonLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: AppColors.white,
  },
  buttonLabelDark: {
    color: AppColors.balanceCard,
  },
});
