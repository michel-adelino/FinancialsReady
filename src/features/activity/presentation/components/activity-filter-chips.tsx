import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { ActivityFilterKey } from '@/features/activity/domain/entities/activity-snapshot';

const FILTERS: { key: ActivityFilterKey; label: string }[] = [
  { key: 'all', label: 'All activity' },
  { key: 'expenses', label: 'Expenses' },
  { key: 'income', label: 'Income' },
  { key: 'updates', label: 'Updates' },
];

type ActivityFilterChipsProps = {
  value: ActivityFilterKey;
  onChange: (key: ActivityFilterKey) => void;
};

export function ActivityFilterChips({ value, onChange }: ActivityFilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {FILTERS.map((filter) => {
        const selected = filter.key === value;
        return (
          <Pressable
            key={filter.key}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(filter.key)}
            style={[styles.chip, selected && styles.chipSelected]}>
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: AppColors.accent,
    borderColor: AppColors.accent,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  labelSelected: {
    fontFamily: FontFamily.bold,
    color: AppColors.white,
  },
});
