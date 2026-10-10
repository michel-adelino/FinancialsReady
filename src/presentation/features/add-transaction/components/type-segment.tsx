import { Minus, Plus } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors , FontFamily } from '@/core/theme';
import type { TransactionType } from '@/domain/entities/transaction';

type TypeSegmentProps = {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
};

export function TypeSegment({ value, onChange }: TypeSegmentProps) {
  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onChange('expense')}
        style={[styles.option, value === 'expense' && styles.optionActive]}>
        <Minus
          size={14}
          color={value === 'expense' ? AppColors.white : AppColors.accent}
          strokeWidth={2.4}
        />
        <Text style={[styles.label, value === 'expense' && styles.labelActive]}>
          Expense
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => onChange('income')}
        style={[styles.option, value === 'income' && styles.optionActive]}>
        <Plus
          size={14}
          color={value === 'income' ? AppColors.white : AppColors.accent}
          strokeWidth={2.4}
        />
        <Text style={[styles.label, value === 'income' && styles.labelActive]}>
          Income
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
  },
  optionActive: {
    backgroundColor: AppColors.balanceCard,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: AppColors.accent,
  },
  labelActive: {
    fontFamily: FontFamily.bold,
    color: AppColors.white,
  },
});
