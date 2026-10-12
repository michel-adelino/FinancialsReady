import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { OnboardingTheme } from '@/features/onboarding/domain/entities/onboarding-step';

type OnboardingStepIndicatorProps = {
  theme: OnboardingTheme;
  activeIndex: number;
  total: number;
  stepLabel: string;
};

export function OnboardingStepIndicator({
  theme,
  activeIndex,
  total,
  stepLabel,
}: OnboardingStepIndicatorProps) {
  const isDark = theme === 'dark';

  return (
    <View style={styles.row}>
      <View style={styles.dots}>
        {Array.from({ length: total }).map((_, index) => {
          const active = index === activeIndex;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                active && styles.dotActive,
                isDark && styles.dotDark,
                active && isDark && styles.dotActiveDark,
              ]}
            />
          );
        })}
      </View>
      <Text style={[styles.label, isDark && styles.labelDark]}>{stepLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: Radius.pill,
    backgroundColor: AppColors.barMuted,
  },
  dotActive: {
    width: 26,
    backgroundColor: AppColors.accent,
  },
  dotDark: {
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  dotActiveDark: {
    backgroundColor: AppColors.splashAccent,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: AppColors.textMuted,
  },
  labelDark: {
    color: AppColors.splashMuted,
  },
});
