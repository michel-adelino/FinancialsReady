import { Check } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

export function ReadyStatusBanner() {
  return (
    <View style={styles.banner}>
      <View style={styles.iconWrap}>
        <Check size={14} color={AppColors.accent} strokeWidth={2.4} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>Ready to track</Text>
        <Text style={styles.body}>Balances update as transactions are added</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.lg,
    padding: 12,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
});
