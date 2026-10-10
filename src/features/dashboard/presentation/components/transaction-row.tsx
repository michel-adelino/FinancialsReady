import { BriefcaseBusiness, Coffee, ShoppingBag, Store } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius , FontFamily } from '@/core/theme';
import type { TransactionIconKey } from '@/features/shared/domain/entities/transaction';
import type { TransactionRowUi } from '@/features/dashboard/presentation/viewmodels/use-dashboard-view-model';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const ICON_MAP: Record<TransactionIconKey, LucideIcon> = {
  'shopping-bag': ShoppingBag,
  'briefcase-business': BriefcaseBusiness,
  coffee: Coffee,
  store: Store,
};

type TransactionRowProps = {
  transaction: TransactionRowUi;
  onPress?: (id: string) => void;
};

export function TransactionRow({ transaction, onPress }: TransactionRowProps) {
  const Icon = ICON_MAP[transaction.iconKey] ?? ShoppingBag;
  const iconBg =
    transaction.iconTone === 'accent' ? AppColors.budgetBadgeBg : AppColors.softSurface;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${transaction.merchant}, ${transaction.amountLabel}`}
      onPress={() => onPress?.(transaction.id)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Icon size={16} color={AppColors.accent} strokeWidth={1.8} />
      </View>
      <View style={styles.details}>
        <Text style={styles.merchant} numberOfLines={1}>
          {transaction.merchant}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {transaction.details}
        </Text>
      </View>
      <Text
        style={[
          styles.amount,
          transaction.isIncome && styles.amountIncome,
        ]}>
        {transaction.amountLabel}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 47,
  },
  rowPressed: {
    opacity: 0.72,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    gap: 2,
  },
  merchant: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.text,
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: AppColors.textMuted,
  },
  amount: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: AppColors.text,
  },
  amountIncome: {
    color: AppColors.income,
  },
});
