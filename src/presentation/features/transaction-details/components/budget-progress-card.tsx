import { ChartColumn } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type BudgetProgressCardProps = {
  title: string;
  spentLabel: string;
  percentLabel: string;
  progress: number;
};

export function BudgetProgressCard({
  title,
  spentLabel,
  percentLabel,
  progress,
}: BudgetProgressCardProps) {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <ChartColumn size={15} color={AppColors.accent} strokeWidth={1.9} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.spent}>{spentLabel}</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
          </View>
        </View>
        <Text style={styles.percent}>{percentLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  spent: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textSecondary,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(47, 111, 94, 0.18)',
    overflow: 'hidden',
    marginTop: 4,
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: AppColors.accent,
  },
  percent: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: AppColors.accent,
    marginTop: 2,
  },
});
