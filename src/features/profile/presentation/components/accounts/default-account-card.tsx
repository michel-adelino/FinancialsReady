import { ChevronRight, CreditCard } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type DefaultAccountCardProps = {
  subtitle: string;
  onPress: () => void;
};

export function DefaultAccountCard({ subtitle, onPress }: DefaultAccountCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={styles.iconWrap}>
        <CreditCard size={16} color={AppColors.accent} strokeWidth={1.8} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>Default transaction account</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>
      <ChevronRight size={14} color={AppColors.textMuted} strokeWidth={2.2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.lg,
    padding: 14,
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
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
});
