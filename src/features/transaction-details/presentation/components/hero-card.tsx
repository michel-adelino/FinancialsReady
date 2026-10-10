import { BriefcaseBusiness, Check, Coffee, ShoppingBag, Store } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { TransactionIconKey } from '@/features/shared/domain/entities/transaction';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const ICON_MAP: Record<TransactionIconKey, LucideIcon> = {
  'shopping-bag': ShoppingBag,
  'briefcase-business': BriefcaseBusiness,
  coffee: Coffee,
  store: Store,
};

type HeroCardProps = {
  statusLabel: string;
  cleared: boolean;
  merchant: string;
  categorySubtitle: string;
  amountLabel: string;
  accountLabel: string;
  currencyCode: string;
  whenLabel: string;
  iconKey: TransactionIconKey;
};

export function HeroCard({
  statusLabel,
  cleared,
  merchant,
  categorySubtitle,
  amountLabel,
  accountLabel,
  currencyCode,
  whenLabel,
  iconKey,
}: HeroCardProps) {
  const Icon = ICON_MAP[iconKey] ?? ShoppingBag;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.status}>{statusLabel}</Text>
        {cleared ? (
          <View style={styles.clearedPill}>
            <Check size={11} color={AppColors.accent} strokeWidth={2.6} />
            <Text style={styles.clearedText}>Cleared</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.merchantRow}>
        <View style={styles.iconWrap}>
          <Icon size={16} color={AppColors.white} strokeWidth={1.8} />
        </View>
        <View style={styles.merchantCopy}>
          <Text style={styles.merchant} numberOfLines={1}>
            {merchant}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {categorySubtitle}
          </Text>
        </View>
      </View>

      <Text style={styles.amount}>{amountLabel}</Text>

      <View style={styles.footer}>
        <Text style={styles.footerLeft}>{accountLabel}</Text>
        <View style={styles.footerRight}>
          <Text style={styles.currency}>{currencyCode}</Text>
          <Text style={styles.when}>{whenLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.balanceCard,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: AppColors.accent,
    padding: 16,
    gap: 14,
    overflow: 'hidden',
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.balanceLabel,
    letterSpacing: 0.4,
  },
  clearedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.changeTint,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearedText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.accent,
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: AppColors.balanceIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantCopy: {
    flex: 1,
    gap: 2,
  },
  merchant: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: AppColors.white,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.balanceMuted,
  },
  amount: {
    fontFamily: FontFamily.bold,
    fontSize: 36,
    lineHeight: 40,
    color: AppColors.white,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppColors.balanceDivider,
    paddingTop: 12,
  },
  footerLeft: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.balanceMuted,
  },
  footerRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  currency: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.white,
  },
  when: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: AppColors.balanceMuted,
  },
});
