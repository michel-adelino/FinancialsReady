import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors, FontFamily } from '@/core/theme';
import type { OnboardingTheme } from '@/features/onboarding/domain/entities/onboarding-step';

type OnboardingHeaderProps = {
  theme: OnboardingTheme;
  showSkip: boolean;
  onSkip: () => void;
};

export function OnboardingHeader({
  theme,
  showSkip,
  onSkip,
}: OnboardingHeaderProps) {
  const insets = useSafeAreaInsets();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.wrap, { paddingTop: Math.max(insets.top, 12) }]}>
      <View style={styles.row}>
        <View style={styles.brand}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            contentFit="cover"
          />
          <Text style={[styles.name, isDark && styles.nameDark]}>
            Financials Ready
          </Text>
        </View>
        {showSkip ? (
          <Pressable accessibilityRole="button" onPress={onSkip} hitSlop={8}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        ) : (
          <View style={styles.skipPlaceholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: AppColors.text,
  },
  nameDark: {
    color: AppColors.white,
  },
  skip: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: AppColors.accent,
  },
  skipPlaceholder: {
    width: 36,
  },
});
