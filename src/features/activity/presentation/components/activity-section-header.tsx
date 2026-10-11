import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily } from '@/core/theme';

type ActivitySectionHeaderProps = {
  title: string;
  sideLabel: string;
};

export function ActivitySectionHeader({
  title,
  sideLabel,
}: ActivitySectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.side}>{sideLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: 4,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  side: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
});
