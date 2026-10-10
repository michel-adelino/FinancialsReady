import { TrendingDown } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { WeeklySpendingPair } from '@/features/insights/domain/entities/insights-snapshot';

const CHART_HEIGHT = 48;

type SpendingTrendCardProps = {
  spendingTotalLabel: string;
  dailyAverageLabel: string;
  spendingChangeLabel: string;
  spendingDeltaLabel: string;
  currentSeriesLabel: string;
  previousSeriesLabel: string;
  weeklyBars: WeeklySpendingPair[];
};

export function SpendingTrendCard({
  spendingTotalLabel,
  dailyAverageLabel,
  spendingChangeLabel,
  spendingDeltaLabel,
  currentSeriesLabel,
  previousSeriesLabel,
  weeklyBars,
}: SpendingTrendCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.title}>Spending trend</Text>
        <View style={styles.trendPill}>
          <TrendingDown size={10} color={AppColors.accent} strokeWidth={2.2} />
          <Text style={styles.trendText}>{spendingChangeLabel}</Text>
        </View>
      </View>

      <View style={styles.totalRow}>
        <View style={styles.amountRow}>
          <Text style={styles.total}>{spendingTotalLabel}</Text>
          <Text style={styles.spent}>spent</Text>
        </View>
        <Text style={styles.daily}>{dailyAverageLabel}</Text>
      </View>

      <View style={styles.chart}>
        {weeklyBars.map((week) => (
          <View key={week.weekLabel} style={styles.weekCol}>
            <View style={styles.barPair}>
              <View style={styles.barSpace}>
                <View
                  style={[
                    styles.bar,
                    styles.previousBar,
                    { height: Math.max(4, week.previousIntensity * CHART_HEIGHT) },
                  ]}
                />
              </View>
              <View style={styles.barSpace}>
                <View
                  style={[
                    styles.bar,
                    week.isHighlighted ? styles.currentBarHighlight : styles.currentBar,
                    { height: Math.max(4, week.currentIntensity * CHART_HEIGHT) },
                  ]}
                />
              </View>
            </View>
            <Text
              style={[
                styles.weekLabel,
                week.isHighlighted && styles.weekLabelHighlight,
              ]}>
              {week.weekLabel}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, styles.dotCurrent]} />
          <Text style={styles.legendCurrent}>{currentSeriesLabel}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, styles.dotPrevious]} />
          <Text style={styles.legendPrevious}>{previousSeriesLabel}</Text>
        </View>
        <Text style={styles.delta}>{spendingDeltaLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    padding: 12,
    gap: 6,
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
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  trendText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: AppColors.accent,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 24,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  total: {
    fontFamily: FontFamily.regular,
    fontSize: 20,
    color: AppColors.text,
  },
  spent: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  daily: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 61,
    paddingTop: 2,
  },
  weekCol: {
    width: 48,
    alignItems: 'center',
    gap: 3,
  },
  barPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: CHART_HEIGHT,
  },
  barSpace: {
    width: 8,
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 8,
    borderRadius: Radius.pill,
  },
  previousBar: {
    backgroundColor: AppColors.barMuted,
  },
  currentBar: {
    backgroundColor: AppColors.chartCurrent,
  },
  currentBarHighlight: {
    backgroundColor: AppColors.accent,
  },
  weekLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  weekLabelHighlight: {
    fontFamily: FontFamily.bold,
    color: AppColors.accent,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 13,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotCurrent: {
    backgroundColor: AppColors.accent,
  },
  dotPrevious: {
    backgroundColor: AppColors.barMuted,
  },
  legendCurrent: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textSecondary,
  },
  legendPrevious: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  delta: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.accent,
  },
});
