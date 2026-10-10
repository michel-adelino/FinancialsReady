import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { Alert } from 'react-native';

import { financeStore } from '@/data/datasources/finance-store';
import { getDashboardUseCase, getGreetingUseCase } from '@/data/di';
import type { YearMonth } from '@/domain/entities/dashboard-snapshot';
import type {
  DailySpendingBar,
  SpendingCategoryShare,
} from '@/domain/entities/spending-overview';
import type { TransactionIconKey } from '@/domain/entities/transaction';
import {
  formatMonthShort,
  formatMonthYear,
  formatTransactionWhen,
} from '@/presentation/utils/format-date';
import { formatMoneyFromCents, maskMoney } from '@/presentation/utils/format-money';

export type TransactionRowUi = {
  id: string;
  merchant: string;
  details: string;
  amountLabel: string;
  isIncome: boolean;
  iconKey: TransactionIconKey;
  iconTone: 'muted' | 'accent';
};

export type DashboardUiState = {
  isLoading: boolean;
  error: string | null;
  greeting: string;
  subtitle: string;
  brandDateLabel: string;
  monthShort: string;
  hasUnreadNotifications: boolean;
  isBalanceHidden: boolean;
  totalBalanceLabel: string;
  changePercentLabel: string;
  incomeLabel: string;
  spendingLabel: string;
  spendingPeriodLabel: string;
  spendingTotalLabel: string;
  spendingAverageLabel: string;
  budgetUsedLabel: string;
  dailyBars: DailySpendingBar[];
  categories: SpendingCategoryShare[];
  transactions: TransactionRowUi[];
};

const INITIAL_MONTH: YearMonth = { year: 2026, month: 9 };

export function useDashboardViewModel() {
  const router = useRouter();
  const [yearMonth, setYearMonth] = useState<YearMonth>(INITIAL_MONTH);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [focusTick, setFocusTick] = useState(0);

  const storeVersion = useSyncExternalStore(
    (onStoreChange) => financeStore.subscribe(onStoreChange),
    () => financeStore.getVersion(),
    () => 0
  );

  useFocusEffect(
    useCallback(() => {
      setFocusTick((tick) => tick + 1);
    }, [])
  );

  const snapshot = useMemo(() => {
    void storeVersion;
    void focusTick;
    return getDashboardUseCase.executeSync(yearMonth);
  }, [focusTick, storeVersion, yearMonth]);

  const ui: DashboardUiState = useMemo(() => {
    const money = (cents: number, signed = false) =>
      isBalanceHidden ? maskMoney() : formatMoneyFromCents(cents, signed);

    const referenceDate = new Date(2026, 8, 30);

    return {
      isLoading: false,
      error: null,
      greeting: getGreetingUseCase.execute(snapshot.user.name, referenceDate),
      subtitle: snapshot.subtitle,
      brandDateLabel: formatMonthYear(
        snapshot.yearMonth.year,
        snapshot.yearMonth.month
      ),
      monthShort: formatMonthShort(snapshot.yearMonth.month),
      hasUnreadNotifications: snapshot.hasUnreadNotifications,
      isBalanceHidden,
      totalBalanceLabel: money(snapshot.balance.totalCents),
      changePercentLabel: `${snapshot.balance.changePercent}%`,
      incomeLabel: money(snapshot.balance.incomeCents),
      spendingLabel: money(snapshot.balance.spendingCents),
      spendingPeriodLabel: snapshot.spending.periodLabel,
      spendingTotalLabel: money(snapshot.spending.totalCents),
      spendingAverageLabel: isBalanceHidden
        ? maskMoney()
        : `${formatMoneyFromCents(snapshot.spending.dailyAverageCents)} average per day`,
      budgetUsedLabel: `${snapshot.spending.budgetUsedPercent}% of budget`,
      dailyBars: snapshot.spending.dailyBars,
      categories: snapshot.spending.categories,
      transactions: snapshot.recentTransactions.map((tx) => ({
        id: tx.id,
        merchant: tx.merchant,
        details: `${tx.category} · ${formatTransactionWhen(tx.occurredAt, referenceDate)}`,
        amountLabel: money(tx.amountCents, true),
        isIncome: tx.type === 'income',
        iconKey: tx.iconKey,
        iconTone: tx.type === 'income' ? ('accent' as const) : ('muted' as const),
      })),
    };
  }, [isBalanceHidden, snapshot]);

  const toggleBalanceVisibility = useCallback(() => {
    setIsBalanceHidden((prev) => !prev);
  }, []);

  const selectMonth = useCallback(() => {
    Alert.alert('Month', 'Month picker coming soon.');
  }, []);

  const selectSpendingPeriod = useCallback(() => {
    Alert.alert('Period', 'Spending period picker coming soon.');
  }, []);

  const onAddExpense = useCallback(() => {
    router.push({ pathname: '/add-transaction', params: { type: 'expense' } });
  }, [router]);

  const onAddIncome = useCallback(() => {
    router.push({ pathname: '/add-transaction', params: { type: 'income' } });
  }, [router]);

  const onViewAllTransactions = useCallback(() => {
    Alert.alert('Transactions', 'Full transaction list coming soon.');
  }, []);

  const onNotifications = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications.');
  }, []);

  const refresh = useCallback(() => {
    setYearMonth((current) => ({ ...current }));
  }, []);

  return {
    ...ui,
    toggleBalanceVisibility,
    selectMonth,
    selectSpendingPeriod,
    onAddExpense,
    onAddIncome,
    onViewAllTransactions,
    onNotifications,
    refresh,
    setYearMonth,
  };
}
