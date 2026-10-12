import { ArrowDownLeft, ArrowUpRight, ChevronDown } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type ActivitySummaryCardProps = {
  periodTitle: string;
  accountFilterLabel: string;
  incomeLabel: string;
  expenseLabel: string;
  onAccountFilterPress: () => void;
};

export function ActivitySummaryCard({
  periodTitle,
  accountFilterLabel,
  incomeLabel,
  expenseLabel,
  onAccountFilterPress,
}: ActivitySummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.ambient} />

      <View style={styles.heading}>
        <Text style={styles.period}>{periodTitle}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onAccountFilterPress}
          style={styles.accountChip}>
          <Text style={styles.accountText}>{accountFilterLabel}</Text>
          <ChevronDown size={10} color={AppColors.balanceMuted} strokeWidth={2.2} />
        </Pressable>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.metric}>
          <View style={styles.metricIcon}>
            <ArrowDownLeft size={12} color={AppColors.white} strokeWidth={2} />
          </View>
          <View style={styles.metricCopy}>
            <Text style={styles.metricLabel}>Income</Text>
            <Text style={styles.metricValue}>{incomeLabel}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.metric}>
          <View style={styles.metricIcon}>
            <ArrowUpRight size={12} color={AppColors.white} strokeWidth={2} />
          </View>
          <View style={styles.metricCopy}>
            <Text style={styles.metricLabel}>Expenses</Text>
            <Text style={styles.metricValue}>{expenseLabel}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.balanceCard,
    borderRadius: 22,
    padding: 14,
    gap: 14,
    overflow: 'hidden',
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  ambient: {
    position: 'absolute',
    right: -34,
    top: -62,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  period: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.balanceLabel,
    letterSpacing: 0.4,
  },
  accountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  accountText: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.balanceMuted,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metric: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricIcon: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    backgroundColor: AppColors.balanceIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricCopy: {
    flex: 1,
    gap: 2,
  },
  metricLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.balanceLabel,
  },
  metricValue: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: AppColors.white,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: AppColors.balanceDivider,
  },
});
