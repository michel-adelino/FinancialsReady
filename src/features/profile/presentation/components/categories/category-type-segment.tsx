import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily } from '@/core/theme';
import type { CategoryKind } from '@/features/profile/domain/entities/category';

type CategoryTypeSegmentProps = {
  value: CategoryKind;
  expenseLabel: string;
  incomeLabel: string;
  onChange: (kind: CategoryKind) => void;
};

export function CategoryTypeSegment({
  value,
  expenseLabel,
  incomeLabel,
  onChange,
}: CategoryTypeSegmentProps) {
  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onChange('expense')}
        style={[styles.option, value === 'expense' && styles.optionActive]}>
        <Text style={[styles.label, value === 'expense' && styles.labelActive]}>
          {expenseLabel}
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => onChange('income')}
        style={[styles.option, value === 'income' && styles.optionActive]}>
        <Text style={[styles.label, value === 'income' && styles.labelActive]}>
          {incomeLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: 4,
    height: 44,
    padding: 4,
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  optionActive: {
    backgroundColor: AppColors.balanceCard,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: AppColors.accent,
  },
  labelActive: {
    fontFamily: FontFamily.bold,
    color: AppColors.white,
  },
});
