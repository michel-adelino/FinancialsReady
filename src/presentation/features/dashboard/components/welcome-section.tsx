import { ChevronDown } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius , FontFamily } from '@/core/theme';

type WelcomeSectionProps = {
  greeting: string;
  subtitle: string;
  monthShort: string;
  onMonthPress: () => void;
};

export function WelcomeSection({
  greeting,
  subtitle,
  monthShort,
  onMonthPress,
}: WelcomeSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.title}>{greeting}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onMonthPress}
        style={styles.monthPill}>
        <Text style={styles.monthText}>{monthShort}</Text>
        <ChevronDown size={12} color={AppColors.textSecondary} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 42,
  },
  greeting: {
    gap: 2,
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: 18,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  monthText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: AppColors.textSecondary,
  },
});
