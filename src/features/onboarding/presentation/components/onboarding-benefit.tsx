import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily } from '@/core/theme';
import type { OnboardingTheme } from '@/features/onboarding/domain/entities/onboarding-step';

type OnboardingBenefitProps = {
  theme: OnboardingTheme;
  overline: string;
  headline: string;
  description: string;
};

export function OnboardingBenefit({
  theme,
  overline,
  headline,
  description,
}: OnboardingBenefitProps) {
  const isDark = theme === 'dark';

  return (
    <View style={styles.wrap}>
      <Text style={[styles.overline, isDark && styles.overlineDark]}>
        {overline}
      </Text>
      <Text style={[styles.headline, isDark && styles.headlineDark]}>
        {headline}
      </Text>
      <Text style={[styles.description, isDark && styles.descriptionDark]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 28,
    gap: 12,
  },
  overline: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: AppColors.accent,
  },
  overlineDark: {
    color: AppColors.splashAccent,
  },
  headline: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    color: AppColors.balanceCard,
  },
  headlineDark: {
    color: AppColors.white,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    color: AppColors.textSecondary,
  },
  descriptionDark: {
    color: AppColors.splashMuted,
  },
});
