import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { CategoryBudgetRow } from '@/features/budget/presentation/components/category-budget-row';
import type { CategoryBudgetRowUi } from '@/features/budget/presentation/viewmodels/use-budgets-view-model';

type CategoryBudgetsSectionProps = {
  activeCountLabel: string;
  categories: CategoryBudgetRowUi[];
  onCategoryPress: (id: string) => void;
};

export function CategoryBudgetsSection({
  activeCountLabel,
  categories,
  onCategoryPress,
}: CategoryBudgetsSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Category budgets</Text>
        <Text style={styles.count}>{activeCountLabel}</Text>
      </View>
      <View style={styles.card}>
        {categories.map((item, index) => (
          <View key={item.id}>
            <CategoryBudgetRow
              item={item}
              onPress={() => onCategoryPress(item.id)}
            />
            {index < categories.length - 1 ? (
              <View style={styles.divider} />
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: AppColors.text,
  },
  count: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.border,
    overflow: 'hidden',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
    marginLeft: 54,
  },
});
