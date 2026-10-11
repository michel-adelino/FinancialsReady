import {
  ChevronRight,
  CreditCard,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily } from '@/core/theme';
import type { Account } from '@/features/profile/domain/entities/account';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const ICON_MAP: Record<Account['type'], { icon: LucideIcon; bg: string; color: string }> = {
  bank: { icon: Landmark, bg: AppColors.budgetBadgeBg, color: AppColors.accent },
  cash: { icon: Wallet, bg: AppColors.softSurface, color: AppColors.textSecondary },
  credit: { icon: CreditCard, bg: AppColors.tipBackground, color: AppColors.categoryDining },
  savings: { icon: PiggyBank, bg: AppColors.budgetBadgeBg, color: AppColors.accent },
};

type AccountRowProps = {
  name: string;
  subtitle: string;
  balanceLabel: string;
  statusLabel: string;
  isCredit: boolean;
  type: Account['type'];
  onPress: () => void;
  showDivider?: boolean;
};

export function AccountRow({
  name,
  subtitle,
  balanceLabel,
  statusLabel,
  isCredit,
  type,
  onPress,
  showDivider = true,
}: AccountRowProps) {
  const meta = ICON_MAP[type];
  const Icon = meta.icon;

  return (
    <View>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: meta.bg }]}>
          <Icon size={16} color={meta.color} strokeWidth={1.8} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.amounts}>
          <Text style={[styles.balance, isCredit && styles.credit]}>{balanceLabel}</Text>
          <Text style={[styles.status, isCredit && styles.creditMuted]}>{statusLabel}</Text>
        </View>
        <ChevronRight size={14} color={AppColors.textMuted} strokeWidth={2.2} />
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 64,
    paddingVertical: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  amounts: {
    alignItems: 'flex-end',
    gap: 2,
  },
  balance: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: AppColors.text,
  },
  status: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.textMuted,
  },
  credit: {
    color: AppColors.categoryDining,
  },
  creditMuted: {
    color: AppColors.categoryDining,
    opacity: 0.85,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
    marginLeft: 46,
  },
});
