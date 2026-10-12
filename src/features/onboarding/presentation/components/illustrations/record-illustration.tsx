import {
  BriefcaseBusiness,
  Coffee,
  Minus,
  Plus,
  ShoppingBag,
} from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

const ROWS = [
  {
    merchant: 'Acme Studio',
    meta: 'Salary · Yesterday',
    amount: '+$2,920.00',
    income: true,
    Icon: BriefcaseBusiness,
    iconBg: AppColors.budgetBadgeBg,
  },
  {
    merchant: 'Whole Foods Market',
    meta: 'Groceries · Today',
    amount: '−$84.26',
    income: false,
    Icon: ShoppingBag,
    iconBg: AppColors.softSurface,
  },
  {
    merchant: 'Fieldwork Coffee',
    meta: 'Dining · Sep 28',
    amount: '−$6.80',
    income: false,
    Icon: Coffee,
    iconBg: AppColors.softSurface,
  },
] as const;

/** Decorative transaction preview for onboarding step 1. */
export function RecordIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.halo} />
      <View style={styles.card}>
        <View style={styles.cardHeading}>
          <Text style={styles.cardTitle}>Your money, together</Text>
          <Text style={styles.cardMonth}>SEP</Text>
        </View>

        {ROWS.map((row) => (
          <View key={row.merchant} style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: row.iconBg }]}>
              <row.Icon size={15} color={AppColors.accent} strokeWidth={1.8} />
            </View>
            <View style={styles.copy}>
              <Text style={styles.merchant}>{row.merchant}</Text>
              <Text style={styles.meta}>{row.meta}</Text>
            </View>
            <Text style={[styles.amount, row.income && styles.amountIncome]}>
              {row.amount}
            </Text>
          </View>
        ))}

        <View style={styles.actions}>
          <View style={[styles.actionBtn, styles.expenseBtn]}>
            <Minus size={13} color={AppColors.balanceCard} strokeWidth={2.4} />
            <Text style={styles.expenseLabel}>Add expense</Text>
          </View>
          <View style={[styles.actionBtn, styles.incomeBtn]}>
            <Plus size={13} color={AppColors.white} strokeWidth={2.4} />
            <Text style={styles.incomeLabel}>Add income</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    height: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: AppColors.budgetBadgeBg,
    opacity: 0.55,
  },
  card: {
    width: 318,
    backgroundColor: AppColors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: AppColors.border,
    padding: 14,
    gap: 10,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 4,
  },
  cardHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  cardMonth: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
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
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: AppColors.text,
  },
  amountIncome: {
    color: AppColors.income,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  expenseBtn: {
    backgroundColor: AppColors.softSurface,
  },
  incomeBtn: {
    backgroundColor: AppColors.accent,
  },
  expenseLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: AppColors.balanceCard,
  },
  incomeLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: AppColors.white,
  },
});
