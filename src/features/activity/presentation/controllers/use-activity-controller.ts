import { type Href, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import type { ActivityFilterKey } from '@/features/activity/domain/entities/activity-snapshot';
import { useActivityViewModel } from '@/features/activity/presentation/viewmodels/use-activity-view-model';

const MONTH_OPTIONS = [
  { pill: 'AUG', title: 'AUGUST SO FAR', label: 'August 2026' },
  { pill: 'SEP', title: 'SEPTEMBER SO FAR', label: 'September 2026' },
  { pill: 'OCT', title: 'OCTOBER SO FAR', label: 'October 2026' },
] as const;

const ACCOUNT_OPTIONS = ['All accounts', 'Everyday checking', 'Visa • 2048'] as const;

/** Handles Activity user intents on top of ViewModel state. */
export function useActivityController() {
  const router = useRouter();
  const viewModel = useActivityViewModel();
  const {
    setFilter,
    setMonthPillLabel,
    setPeriodTitle,
    setAccountFilterLabel,
  } = viewModel;

  const onNotifications = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications.');
  }, []);

  const onSelectFilter = useCallback(
    (key: ActivityFilterKey) => {
      setFilter(key);
    },
    [setFilter]
  );

  const onMonthPress = useCallback(() => {
    Alert.alert('Month', undefined, [
      ...MONTH_OPTIONS.map((option) => ({
        text: option.label,
        onPress: () => {
          setMonthPillLabel(option.pill);
          setPeriodTitle(option.title);
        },
      })),
      { text: 'Cancel', style: 'cancel' as const },
    ]);
  }, [setMonthPillLabel, setPeriodTitle]);

  const onAccountFilterPress = useCallback(() => {
    Alert.alert('Accounts', undefined, [
      ...ACCOUNT_OPTIONS.map((label) => ({
        text: label,
        onPress: () => setAccountFilterLabel(label),
      })),
      { text: 'Cancel', style: 'cancel' as const },
    ]);
  }, [setAccountFilterLabel]);

  const onItemPress = useCallback(
    (id: string, kind: string) => {
      if (kind === 'transaction') {
        router.push({ pathname: '/transaction-details', params: { id } } as Href);
        return;
      }
      if (kind === 'account_update') {
        Alert.alert('Account update', 'Account sync details coming soon.');
        return;
      }
      Alert.alert('Budget alert', 'Budget details coming soon.');
    },
    [router]
  );

  return {
    brandDateLabel: viewModel.brandDateLabel,
    hasUnreadNotifications: viewModel.hasUnreadNotifications,
    monthPillLabel: viewModel.monthPillLabel,
    periodTitle: viewModel.periodTitle,
    accountFilterLabel: viewModel.accountFilterLabel,
    incomeLabel: viewModel.incomeLabel,
    expenseLabel: viewModel.expenseLabel,
    filter: viewModel.filter,
    sections: viewModel.sections,
    onNotifications,
    onSelectFilter,
    onMonthPress,
    onAccountFilterPress,
    onItemPress,
  };
}
