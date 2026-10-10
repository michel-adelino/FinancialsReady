import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  Minus,
  Plus,
  TrendingUp,
} from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius , FontFamily } from '@/core/theme';

type BalanceCardProps = {
  totalLabel: string;
  changePercentLabel: string;
  incomeLabel: string;
  spendingLabel: string;
  isBalanceHidden: boolean;
  onToggleVisibility: () => void;
  onAddExpense: () => void;
  onAddIncome: () => void;
};

export function BalanceCard({
  totalLabel,
  changePercentLabel,
  incomeLabel,
  spendingLabel,
  isBalanceHidden,
  onToggleVisibility,
  onAddExpense,
  onAddIncome,
}: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.ambient} />

      <View style={styles.heading}>
        <View style={styles.balanceBlock}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>TOTAL BALANCE</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                isBalanceHidden ? 'Show balance' : 'Hide balance'
              }
              hitSlop={8}
              onPress={onToggleVisibility}>
              {isBalanceHidden ? (
                <EyeOff size={12} color="rgba(255,255,255,0.56)" strokeWidth={1.7} />
              ) : (
                <Eye size={12} color="rgba(255,255,255,0.56)" strokeWidth={1.7} />
              )}
            </Pressable>
          </View>
          <Text style={styles.amount}>{totalLabel}</Text>
        </View>

        <View style={styles.changePill}>
          <TrendingUp size={11} color={AppColors.changeTint} strokeWidth={2.2} />
          <Text style={styles.changeText}>{changePercentLabel}</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.moneySummary}>
          <View style={styles.statusIcon}>
            <ArrowDownLeft size={13} color={AppColors.white} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryAmount}>{incomeLabel}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.moneySummary}>
          <View style={styles.statusIcon}>
            <ArrowUpRight size={13} color={AppColors.white} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.summaryLabel}>Spending</Text>
            <Text style={styles.summaryAmount}>{spendingLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onAddExpense}
          style={[styles.actionBtn, styles.expenseBtn]}>
          <Minus size={14} color={AppColors.balanceCard} strokeWidth={2.4} />
          <Text style={styles.expenseLabel}>Add expense</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onAddIncome}
          style={[styles.actionBtn, styles.incomeBtn]}>
          <Plus size={14} color={AppColors.white} strokeWidth={2.4} />
          <Text style={styles.incomeLabel}>Add income</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.balanceCard,
    borderRadius: Radius.xl,
    padding: 14,
    gap: 8,
    overflow: 'hidden',
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  ambient: {
    position: 'absolute',
    right: -26,
    top: -45,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balanceBlock: {
    gap: 2,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.balanceLabel,
  },
  amount: {
    fontFamily: FontFamily.regular,
    fontSize: 32,
    lineHeight: 35,
    color: AppColors.white,
  },
  changePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.balanceIconBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  changeText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.changeTint,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moneySummary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statusIcon: {
    width: 26,
    height: 26,
    borderRadius: Radius.sm,
    backgroundColor: AppColors.balanceIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.balanceMuted,
  },
  summaryAmount: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.white,
  },
  divider: {
    width: 1,
    height: 27,
    backgroundColor: AppColors.balanceDivider,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    height: 34,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  expenseBtn: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.white,
  },
  incomeBtn: {
    backgroundColor: AppColors.balanceIconBg,
    borderWidth: 1,
    borderColor: AppColors.balanceBorder,
  },
  expenseLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.balanceCard,
  },
  incomeLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.white,
  },
});
