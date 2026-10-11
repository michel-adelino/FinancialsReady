import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import type { BudgetPeriod } from '@/features/budget/domain/entities/budget';
import { useCreateBudgetViewModel } from '@/features/budget/presentation/viewmodels/use-create-budget-view-model';
import { budgetService, categoriesService } from '@/features/shared/di';

const PERIOD_OPTIONS: { period: BudgetPeriod; label: string; resets: string }[] = [
  { period: 'weekly', label: 'Weekly', resets: 'Every Monday' },
  { period: 'monthly', label: 'Monthly', resets: '1st day of each month' },
  { period: 'yearly', label: 'Yearly', resets: 'January 1st each year' },
];

const THRESHOLD_OPTIONS = [50, 70, 80, 90, 100];

/** Handles Create Budget intents. */
export function useCreateBudgetController() {
  const router = useRouter();
  const viewModel = useCreateBudgetViewModel();

  const {
    isSaving,
    setIsSaving,
    amountCents,
    categoryId,
    categoryName,
    period,
    resetsLabel,
    alertEnabled,
    alertThresholdPercent,
    setCategoryId,
    setCategoryName,
    setPeriod,
    setResetsLabel,
    setAlertThresholdPercent,
  } = viewModel;

  const cancel = useCallback(() => {
    router.back();
  }, [router]);

  const pickCategory = useCallback(() => {
    const expenseCategories = categoriesService
      .getSnapshotSync()
      .categories.filter((category) => category.kind === 'expense');

    Alert.alert('Category', undefined, [
      ...expenseCategories.map((category) => ({
        text: category.name,
        onPress: () => {
          setCategoryId(category.id);
          setCategoryName(category.name);
        },
      })),
      { text: 'Cancel', style: 'cancel' as const },
    ]);
  }, [setCategoryId, setCategoryName]);

  const pickPeriod = useCallback(() => {
    Alert.alert('Period', undefined, [
      ...PERIOD_OPTIONS.map((option) => ({
        text: option.label,
        onPress: () => {
          setPeriod(option.period);
          setResetsLabel(option.resets);
        },
      })),
      { text: 'Cancel', style: 'cancel' as const },
    ]);
  }, [setPeriod, setResetsLabel]);

  const pickResets = useCallback(() => {
    Alert.alert('Resets', undefined, [
      {
        text: '1st day of each month',
        onPress: () => setResetsLabel('1st day of each month'),
      },
      {
        text: 'Last day of each month',
        onPress: () => setResetsLabel('Last day of each month'),
      },
      {
        text: 'Every Monday',
        onPress: () => setResetsLabel('Every Monday'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [setResetsLabel]);

  const pickThreshold = useCallback(() => {
    Alert.alert('Alert threshold', undefined, [
      ...THRESHOLD_OPTIONS.map((percent) => ({
        text: `${percent}%`,
        onPress: () => setAlertThresholdPercent(percent),
      })),
      { text: 'Cancel', style: 'cancel' as const },
    ]);
  }, [setAlertThresholdPercent]);

  const save = useCallback(() => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      budgetService.addBudget({
        amountCents,
        categoryId,
        categoryName,
        period,
        resetsLabel,
        alertEnabled,
        alertThresholdPercent,
        currencyCode: 'USD',
      });
      router.back();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save budget.';
      Alert.alert('Save failed', message);
    } finally {
      setIsSaving(false);
    }
  }, [
    alertEnabled,
    alertThresholdPercent,
    amountCents,
    categoryId,
    categoryName,
    isSaving,
    period,
    resetsLabel,
    router,
    setIsSaving,
  ]);

  return {
    displayAmount: viewModel.displayAmount,
    isAmountFocused: viewModel.isAmountFocused,
    setIsAmountFocused: viewModel.setIsAmountFocused,
    onChangeAmountText: viewModel.onChangeAmountText,
    statusBadge: viewModel.statusBadge,
    categoryName: viewModel.categoryName,
    periodLabel: viewModel.periodLabel,
    resetsLabel: viewModel.resetsLabel,
    alertEnabled: viewModel.alertEnabled,
    setAlertEnabled: viewModel.setAlertEnabled,
    thresholdPillLabel: viewModel.thresholdPillLabel,
    alertSummaryTitle: viewModel.alertSummaryTitle,
    alertSummaryBody: viewModel.alertSummaryBody,
    summaryLine: viewModel.summaryLine,
    isSaving: viewModel.isSaving,
    pickCategory,
    pickPeriod,
    pickResets,
    pickThreshold,
    save,
    cancel,
  };
}
