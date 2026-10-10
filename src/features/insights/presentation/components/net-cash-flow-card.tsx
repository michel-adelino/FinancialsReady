import { ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type NetCashFlowCardProps = {
  netCashFlowLabel: string;
  netChangePercentLabel: string;
  incomeLabel: string;
  expenseLabel: string;
};

export function NetCashFlowCard({
  netCashFlowLabel,
  netChangePercentLabel,
  incomeLabel,
  expenseLabel,
}: NetCashFlowCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.ambient} />

      <View style={styles.heading}>
        <View style={styles.amountBlock}>
          <Text style={styles.label}>NET CASH FLOW</Text>
          <Text style={styles.amount}>{netCashFlowLabel}</Text>
        </View>
        <View style={styles.changePill}>
          <TrendingUp size={10} color={AppColors.changeTint} strokeWidth={2.2} />
          <Text style={styles.changeText}>{netChangePercentLabel}</Text>
        </View>
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
    padding: 12,
    gap: 8,
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  amountBlock: {
    gap: 1,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.balanceLabel,
  },
  amount: {
    fontFamily: FontFamily.regular,
    fontSize: 26,
    lineHeight: 28,
    color: AppColors.white,
  },
  changePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.balanceIconBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  changeText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: AppColors.changeTint,
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
    gap: 7,
  },
  metricIcon: {
    width: 25,
    height: 25,
    borderRadius: Radius.sm,
    backgroundColor: AppColors.balanceIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricCopy: {
    flex: 1,
    gap: 1,
  },
  metricLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.balanceLabel,
  },
  metricValue: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.white,
  },
  divider: {
    width: 1,
    height: 26,
    backgroundColor: AppColors.balanceDivider,
  },
});
