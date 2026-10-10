import {
  CalendarDays,
  ChevronRight,
  CreditCard,
  ShoppingBag,
  Store,
} from 'lucide-react-native';
import type { ComponentType, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';
import { FontFamily } from '@/presentation/theme/typography';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type DetailRowProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor?: string;
  trailing?: ReactNode;
  mutedValue?: boolean;
  onPress: () => void;
  showDivider?: boolean;
};

function DetailRow({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor = AppColors.accent,
  trailing,
  mutedValue,
  onPress,
  showDivider = true,
}: DetailRowProps) {
  return (
    <View style={styles.rowWrap}>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Icon size={15} color={iconColor} strokeWidth={1.8} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>{label}</Text>
          <Text
            style={[styles.value, mutedValue && styles.valueMuted]}
            numberOfLines={1}>
            {value}
          </Text>
        </View>
        {trailing}
        <ChevronRight size={13} color={AppColors.textMuted} strokeWidth={2.2} />
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

type DetailRowsProps = {
  payeeLabel: string;
  payeeValue: string;
  onPayeePress: () => void;
  categoryValue: string;
  categoryMuted: boolean;
  onCategoryPress: () => void;
  accountValue: string;
  accountAvailable: string;
  onAccountPress: () => void;
  dateValue: string;
  onDatePress: () => void;
};

export function DetailRows({
  payeeLabel,
  payeeValue,
  onPayeePress,
  categoryValue,
  categoryMuted,
  onCategoryPress,
  accountValue,
  accountAvailable,
  onAccountPress,
  dateValue,
  onDatePress,
}: DetailRowsProps) {
  return (
    <View style={styles.card}>
      <DetailRow
        label={payeeLabel}
        value={payeeValue || 'Select'}
        mutedValue={!payeeValue}
        icon={Store}
        iconBg={AppColors.softSurface}
        onPress={onPayeePress}
      />
      <DetailRow
        label="CATEGORY"
        value={categoryValue}
        mutedValue={categoryMuted}
        icon={ShoppingBag}
        iconBg="#F7E8E3"
        iconColor="#C4785A"
        onPress={onCategoryPress}
      />
      <DetailRow
        label="ACCOUNT"
        value={accountValue}
        icon={CreditCard}
        iconBg={AppColors.budgetBadgeBg}
        trailing={<Text style={styles.supporting}>{accountAvailable}</Text>}
        onPress={onAccountPress}
      />
      <DetailRow
        label="DATE"
        value={dateValue}
        icon={CalendarDays}
        iconBg={AppColors.softSurface}
        onPress={onDatePress}
        showDivider={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  rowWrap: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 54,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  value: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  valueMuted: {
    color: AppColors.textMuted,
  },
  supporting: {
    fontFamily: FontFamily.medium,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
  },
});
