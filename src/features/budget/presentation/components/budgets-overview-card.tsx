import { CircleCheck } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type BudgetsOverviewCardProps = {
  periodTitle: string;
  spentLabel: string;
  plannedLabel: string;
  usedPercentLabel: string;
  usedProgress: number;
  remainingLabel: string;
  dailyAllowanceLabel: string;
};

export function BudgetsOverviewCard({
  periodTitle,
  spentLabel,
  plannedLabel,
  usedPercentLabel,
  usedProgress,
  remainingLabel,
  dailyAllowanceLabel,
}: BudgetsOverviewCardProps) {
  const clamped = Math.max(0, Math.min(1, usedProgress));

  return (
    <View style={styles.card}>
      <View style={styles.ambient} />

      <View style={styles.heading}>
        <View style={styles.amountBlock}>
          <Text style={styles.period}>{periodTitle}</Text>
          <Text style={styles.spent}>{spentLabel}</Text>
          <Text style={styles.planned}>{plannedLabel}</Text>
        </View>
        <View style={styles.statusPill}>
          <CircleCheck size={11} color={AppColors.changeTint} strokeWidth={2.2} />
          <Text style={styles.statusText}>{usedPercentLabel}</Text>
        </View>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Remaining</Text>
          <Text style={styles.metricValue}>{remainingLabel}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Daily allowance</Text>
          <Text style={styles.metricValue}>{dailyAllowanceLabel}</Text>
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
    gap: 12,
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
    top: -58,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  amountBlock: {
    gap: 2,
  },
  period: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.balanceLabel,
    letterSpacing: 0.4,
  },
  spent: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    lineHeight: 32,
    color: AppColors.white,
  },
  planned: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: AppColors.balanceMuted,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.balanceIconBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  statusText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.changeTint,
  },
  track: {
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: AppColors.splashAccent,
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metric: {
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
    fontSize: 14,
    color: AppColors.white,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: AppColors.balanceDivider,
    marginHorizontal: 12,
  },
});
