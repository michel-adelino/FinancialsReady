import { Tags } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

export function CategoriesInfoBanner() {
  return (
    <View style={styles.banner}>
      <View style={styles.iconWrap}>
        <Tags size={16} color={AppColors.accent} strokeWidth={1.8} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>One category, connected everywhere</Text>
        <Text style={styles.body}>Used in transaction entry, budgets and insights</Text>
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
    width: 34,
    height: 34,
    borderRadius: 10,
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
    fontSize: 11,
    color: AppColors.textMuted,
  },
});
