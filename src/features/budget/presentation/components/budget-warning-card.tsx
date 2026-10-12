import { TriangleAlert } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type BudgetWarningCardProps = {
  title: string;
  percentLabel: string;
  message: string;
};

export function BudgetWarningCard({
  title,
  percentLabel,
  message,
}: BudgetWarningCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <TriangleAlert size={16} color={AppColors.categoryDining} strokeWidth={1.9} />
      </View>
      <View style={styles.copy}>
        <View style={styles.heading}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.percent}>{percentLabel}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: AppColors.tipBackground,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.tipBorder,
    padding: 12,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  percent: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: AppColors.categoryDining,
  },
  message: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    lineHeight: 15,
    color: AppColors.textSecondary,
  },
});
