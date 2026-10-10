import { Calendar, CreditCard, ShoppingBag } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type InfoRowsProps = {
  category: string;
  paymentMethodLabel: string;
  paymentMethodKind: string;
  dateTimeLabel: string;
};

export function InfoRows({
  category,
  paymentMethodLabel,
  paymentMethodKind,
  dateTimeLabel,
}: InfoRowsProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, styles.categoryIcon]}>
          <ShoppingBag size={15} color="#C45B4A" strokeWidth={1.9} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>CATEGORY</Text>
          <Text style={styles.value}>{category}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={[styles.iconWrap, styles.paymentIcon]}>
          <CreditCard size={15} color={AppColors.accent} strokeWidth={1.9} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>PAYMENT METHOD</Text>
          <Text style={styles.value}>{paymentMethodLabel}</Text>
        </View>
        <Text style={styles.trailing}>{paymentMethodKind}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={[styles.iconWrap, styles.dateIcon]}>
          <Calendar size={15} color={AppColors.textMuted} strokeWidth={1.9} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>DATE & TIME</Text>
          <Text style={styles.value}>{dateTimeLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 56,
    paddingVertical: 8,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    backgroundColor: '#F8E6E2',
  },
  paymentIcon: {
    backgroundColor: AppColors.budgetBadgeBg,
  },
  dateIcon: {
    backgroundColor: AppColors.softSurface,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.textMuted,
    letterSpacing: 0.3,
  },
  value: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  trailing: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
    marginLeft: 44,
  },
});
