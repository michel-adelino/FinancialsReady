import { Bell } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type AlertSummaryCardProps = {
  title: string;
  body: string;
};

export function AlertSummaryCard({ title, body }: AlertSummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Bell size={16} color={AppColors.categoryDining} strokeWidth={1.9} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
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
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.tipBorder,
    padding: 14,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: AppColors.textMuted,
    lineHeight: 17,
  },
});
