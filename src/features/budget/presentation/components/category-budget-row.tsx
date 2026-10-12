import { CarFront, Home, ShoppingBag, Utensils } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily } from '@/core/theme';
import type { BudgetIconKey } from '@/features/budget/domain/entities/budget';
import type { CategoryBudgetRowUi } from '@/features/budget/presentation/viewmodels/use-budgets-view-model';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const ICON_MAP: Record<BudgetIconKey, LucideIcon> = {
  home: Home,
  utensils: Utensils,
  car: CarFront,
  'shopping-bag': ShoppingBag,
};

const ICON_BG: Record<BudgetIconKey, string> = {
  home: AppColors.budgetBadgeBg,
  utensils: AppColors.tipBackground,
  car: AppColors.softSurface,
  'shopping-bag': AppColors.budgetBadgeBg,
};

const ICON_COLOR: Record<BudgetIconKey, string> = {
  home: AppColors.accent,
  utensils: AppColors.categoryDining,
  car: AppColors.categoryTransport,
  'shopping-bag': AppColors.accent,
};

type CategoryBudgetRowProps = {
  item: CategoryBudgetRowUi;
  onPress: () => void;
};

export function CategoryBudgetRow({ item, onPress }: CategoryBudgetRowProps) {
  const Icon = ICON_MAP[item.iconKey] ?? ShoppingBag;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.top}>
        <View
          style={[styles.iconWrap, { backgroundColor: ICON_BG[item.iconKey] }]}>
          <Icon size={14} color={ICON_COLOR[item.iconKey]} strokeWidth={1.9} />
        </View>
        <View style={styles.copy}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text
              style={[styles.remaining, item.isWarning && styles.remainingWarn]}>
              {item.remainingLabel}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.spent}>{item.spentOfLimitLabel}</Text>
            <Text style={[styles.percent, item.isWarning && styles.percentWarn]}>
              {item.percentLabel}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            item.isWarning && styles.fillWarn,
            { width: `${Math.max(0, Math.min(1, item.progress)) * 100}%` },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.75,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  remaining: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: AppColors.accent,
  },
  remainingWarn: {
    color: AppColors.categoryDining,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spent: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  percent: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  percentWarn: {
    color: AppColors.categoryDining,
  },
  track: {
    height: 5,
    borderRadius: 3,
    backgroundColor: AppColors.softSurface,
    overflow: 'hidden',
    marginLeft: 40,
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: AppColors.accent,
  },
  fillWarn: {
    backgroundColor: AppColors.categoryDining,
  },
});
