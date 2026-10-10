import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { formatMoneyFromCents } from '@/core/utils/format-money';
import type { InsightsCategoryShare } from '@/features/insights/domain/entities/insights-snapshot';

type CategoryBreakdownCardProps = {
  categories: InsightsCategoryShare[];
  totalLabel: string;
};

export function CategoryBreakdownCard({
  categories,
  totalLabel,
}: CategoryBreakdownCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.title}>Where your money went</Text>
        <Text style={styles.total}>{totalLabel}</Text>
      </View>

      <View style={styles.list}>
        {categories.map((category) => (
          <View key={category.label} style={styles.row}>
            <View style={styles.details}>
              <View style={styles.nameRow}>
                <View style={[styles.dot, { backgroundColor: category.color }]} />
                <Text style={styles.name}>{category.label}</Text>
                <Text style={styles.percent}>{category.percent}%</Text>
              </View>
              <Text style={styles.amount}>
                {formatMoneyFromCents(category.amountCents)}
              </Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  {
                    width: `${Math.max(0, Math.min(100, category.percent))}%`,
                    backgroundColor: category.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    padding: 12,
    gap: 7,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 18,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: AppColors.text,
  },
  total: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  list: {
    gap: 5,
  },
  row: {
    gap: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.text,
  },
  percent: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: AppColors.textSecondary,
  },
  amount: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.text,
  },
  track: {
    height: 6,
    borderRadius: Radius.pill,
    backgroundColor: AppColors.softSurface,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.pill,
  },
});
