import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useDashboardViewModel } from '@/presentation/features/dashboard/viewmodels/use-dashboard-view-model';

/** Handles dashboard user intents (navigation, pickers) on top of ViewModel state. */
export function useDashboardController() {
  const router = useRouter();
  const viewModel = useDashboardViewModel();

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

  return {
    ...viewModel,
    selectMonth,
    selectSpendingPeriod,
    onAddExpense,
    onAddIncome,
    onViewAllTransactions,
    onNotifications,
  };
}
