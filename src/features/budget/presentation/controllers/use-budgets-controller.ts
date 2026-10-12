import { type Href, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useBudgetsViewModel } from '@/features/budget/presentation/viewmodels/use-budgets-view-model';

const MONTH_OPTIONS = [
  { pill: 'AUG', title: 'AUGUST BUDGET', label: 'August 2026' },
  { pill: 'SEP', title: 'SEPTEMBER BUDGET', label: 'September 2026' },
  { pill: 'OCT', title: 'OCTOBER BUDGET', label: 'October 2026' },
] as const;

/** Handles Budgets / Plans tab intents. */
export function useBudgetsController() {
  const router = useRouter();
  const viewModel = useBudgetsViewModel();
  const { setMonthPillLabel, setPeriodTitle } = viewModel;

  const onNotifications = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications.');
  }, []);

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

  const onCreatePress = useCallback(() => {
    router.push('/create-budget' as Href);
  }, [router]);

  const onCategoryPress = useCallback((_id: string) => {
    Alert.alert('Budget details', 'Budget details coming soon.');
  }, []);

  return {
    brandDateLabel: viewModel.brandDateLabel,
    hasUnreadNotifications: viewModel.hasUnreadNotifications,
    monthPillLabel: viewModel.monthPillLabel,
    periodTitle: viewModel.periodTitle,
    spentLabel: viewModel.spentLabel,
    plannedLabel: viewModel.plannedLabel,
    usedPercentLabel: viewModel.usedPercentLabel,
    usedProgress: viewModel.usedProgress,
    remainingLabel: viewModel.remainingLabel,
    dailyAllowanceLabel: viewModel.dailyAllowanceLabel,
    warning: viewModel.warning,
    activeCountLabel: viewModel.activeCountLabel,
    categories: viewModel.categories,
    onNotifications,
    onMonthPress,
    onCreatePress,
    onCategoryPress,
  };
}
