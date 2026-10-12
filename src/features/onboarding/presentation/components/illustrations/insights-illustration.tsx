import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

const BARS: {
  week: string;
  prev: number;
  curr: number;
  highlight?: boolean;
}[] = [
  { week: 'W1', prev: 0.55, curr: 0.42 },
  { week: 'W2', prev: 0.72, curr: 0.62 },
  { week: 'W3', prev: 0.48, curr: 0.38 },
  { week: 'W4', prev: 0.68, curr: 0.78, highlight: true },
];

/** Decorative dashboard + trend preview for onboarding step 2. */
export function InsightsIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.halo} />

      <View style={styles.stack}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeading}>
            <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
            <Text style={styles.balanceMonth}>September</Text>
          </View>
          <Text style={styles.balanceAmount}>$12,680.45</Text>
          <View style={styles.balanceMetrics}>
            <Text style={styles.balanceMetric}>Income  $5,840.00</Text>
            <Text style={styles.balanceMetric}>Spent  $2,148.30</Text>
          </View>
        </View>

        <View style={styles.trendCard}>
          <View style={styles.trendHeading}>
            <Text style={styles.trendTitle}>Spending trend</Text>
            <View style={styles.trendPill}>
              <Text style={styles.trendPillText}>8.6% lower</Text>
            </View>
          </View>
          <View style={styles.legend}>
            <Text style={styles.legendItem}>
              <Text style={styles.legendDotCurrent}>● </Text>September
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.legendDotPrev}>● </Text>August
            </Text>
          </View>
          <View style={styles.bars}>
            {BARS.map((bar) => (
              <View key={bar.week} style={styles.barCol}>
                <View style={styles.barPair}>
                  <View
                    style={[
                      styles.bar,
                      styles.barPrev,
                      { height: 48 * bar.prev },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      styles.barCurr,
                      bar.highlight && styles.barHighlight,
                      { height: 48 * bar.curr },
                    ]}
                  />
                </View>
                <Text style={styles.week}>{bar.week}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.categoryChip}>
          <View style={styles.categoryDot} />
          <Text style={styles.categoryText}>
            Housing  42% of your spending.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    height: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: AppColors.budgetBadgeBg,
    opacity: 0.5,
  },
  stack: {
    width: 300,
    gap: 10,
    alignItems: 'center',
  },
  balanceCard: {
    width: '100%',
    backgroundColor: AppColors.balanceCard,
    borderRadius: 20,
    padding: 14,
    gap: 6,
    zIndex: 3,
  },
  balanceHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.balanceLabel,
  },
  balanceMonth: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.balanceMuted,
  },
  balanceAmount: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    color: AppColors.white,
  },
  balanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  balanceMetric: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.balanceMuted,
  },
  trendCard: {
    width: '92%',
    marginTop: -28,
    backgroundColor: AppColors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: AppColors.border,
    padding: 12,
    gap: 8,
    zIndex: 2,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  trendHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: AppColors.text,
  },
  trendPill: {
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  trendPillText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: AppColors.accent,
  },
  legend: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  legendDotCurrent: {
    color: AppColors.chartCurrent,
  },
  legendDotPrev: {
    color: AppColors.barMuted,
  },
  bars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 64,
  },
  barCol: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  barPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 48,
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  barPrev: {
    backgroundColor: AppColors.barMuted,
  },
  barCurr: {
    backgroundColor: AppColors.chartCurrent,
  },
  barHighlight: {
    backgroundColor: AppColors.accent,
  },
  week: {
    fontFamily: FontFamily.medium,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    zIndex: 1,
  },
  categoryDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: AppColors.accent,
  },
  categoryText: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.text,
  },
});
