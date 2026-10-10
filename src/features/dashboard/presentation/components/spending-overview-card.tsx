import { CheckCircle2, ChevronDown } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius , FontFamily } from '@/core/theme';
import type { DailySpendingBar, SpendingCategoryShare } from '@/features/dashboard/domain/entities/spending-overview';

type SpendingOverviewCardProps = {
  periodLabel: string;
  totalLabel: string;
  averageLabel: string;
  budgetUsedLabel: string;
  dailyBars: DailySpendingBar[];
  categories: SpendingCategoryShare[];
  onPeriodPress: () => void;
};

const CHART_HEIGHT = 42;

export function SpendingOverviewCard({
  periodLabel,
  totalLabel,
  averageLabel,
  budgetUsedLabel,
  dailyBars,
  categories,
  onPeriodPress,
}: SpendingOverviewCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.title}>Spending overview</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onPeriodPress}
          style={styles.periodPill}>
          <Text style={styles.periodText}>{periodLabel}</Text>
          <ChevronDown size={10} color={AppColors.textSecondary} strokeWidth={2} />
        </Pressable>
      </View>

      <View style={styles.totalRow}>
        <View style={styles.amountBlock}>
          <Text style={styles.total}>{totalLabel}</Text>
          <Text style={styles.average}>{averageLabel}</Text>
        </View>
        <View style={styles.budgetPill}>
          <CheckCircle2 size={11} color={AppColors.accent} strokeWidth={2.2} />
          <Text style={styles.budgetText}>{budgetUsedLabel}</Text>
        </View>
      </View>

      <View style={styles.chart}>
        {dailyBars.map((bar, index) => {
          const height = Math.max(4, Math.round(bar.intensity * CHART_HEIGHT));
          return (
            <View key={`${bar.dayLabel}-${index}`} style={styles.dayCol}>
              <View style={styles.barSpace}>
                <View style={styles.spacer} />
                <View
                  style={[
                    styles.bar,
                    {
                      height,
                      backgroundColor: bar.isHighlighted
                        ? AppColors.accent
                        : AppColors.barMuted,
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.dayLabel,
                  bar.isHighlighted && styles.dayLabelActive,
                ]}>
                {bar.dayLabel}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.categories}>
        {categories.map((category) => (
          <Text key={category.label} style={styles.categoryText}>
            {category.label} {category.percent}%
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    padding: 14,
    gap: 8,
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
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: AppColors.text,
  },
  periodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.softSurface,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  periodText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: AppColors.textSecondary,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amountBlock: {
    gap: 1,
  },
  total: {
    fontFamily: FontFamily.regular,
    fontSize: 22,
    color: AppColors.text,
  },
  average: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: AppColors.textMuted,
  },
  budgetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  budgetText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.accent,
  },
  chart: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dayCol: {
    width: 30,
    height: 56,
    alignItems: 'center',
    gap: 3,
  },
  barSpace: {
    flex: 1,
    width: 8,
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: 1,
  },
  bar: {
    width: 8,
    borderRadius: Radius.pill,
  },
  dayLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  dayLabelActive: {
    fontFamily: FontFamily.bold,
    color: AppColors.accent,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.textSecondary,
  },
});
