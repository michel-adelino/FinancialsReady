import { ChevronDown } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type BudgetMonthPillProps = {
  label: string;
  onPress: () => void;
};

export function BudgetMonthPill({ label, onPress }: BudgetMonthPillProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.pill}>
      <Text style={styles.label}>{label}</Text>
      <ChevronDown size={11} color={AppColors.textMuted} strokeWidth={2.2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: AppColors.text,
  },
});
