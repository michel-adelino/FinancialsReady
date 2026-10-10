import { Lightbulb } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type InsightTipCardProps = {
  title: string;
  usedLabel: string;
  body: string;
};

export function InsightTipCard({ title, usedLabel, body }: InsightTipCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Lightbulb size={16} color={AppColors.categoryDining} strokeWidth={1.9} />
      </View>
      <View style={styles.copy}>
        <View style={styles.heading}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.used}>{usedLabel}</Text>
        </View>
        <Text style={styles.body}>{body}</Text>
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
    borderWidth: 1,
    borderColor: AppColors.tipBorder,
    borderRadius: Radius.md,
    padding: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
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
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: AppColors.text,
  },
  used: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: AppColors.categoryDining,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    lineHeight: 12,
    color: AppColors.textSecondary,
  },
});
