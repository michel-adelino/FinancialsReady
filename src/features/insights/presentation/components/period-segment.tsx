import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { InsightsPeriodKey } from '@/features/insights/domain/entities/insights-snapshot';

const PERIODS: InsightsPeriodKey[] = ['1M', '3M', '6M', 'YTD'];

type PeriodSegmentProps = {
  value: InsightsPeriodKey;
  onChange: (period: InsightsPeriodKey) => void;
};

export function PeriodSegment({ value, onChange }: PeriodSegmentProps) {
  return (
    <View style={styles.track}>
      {PERIODS.map((period) => {
        const selected = period === value;
        return (
          <Pressable
            key={period}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(period)}
            style={[styles.option, selected && styles.optionSelected]}>
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {period}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    padding: 3,
    borderRadius: Radius.pill,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    gap: 3,
  },
  option: {
    flex: 1,
    height: '100%',
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.surface,
  },
  optionSelected: {
    backgroundColor: AppColors.accent,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.textSecondary,
  },
  labelSelected: {
    fontFamily: FontFamily.bold,
    color: AppColors.white,
  },
});
