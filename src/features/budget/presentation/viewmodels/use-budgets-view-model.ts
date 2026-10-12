import { useMemo, useState, useSyncExternalStore } from 'react';

import { formatMoneyFromCents } from '@/core/utils/format-money';
import type { BudgetIconKey } from '@/features/budget/domain/entities/budget';
import { budgetService } from '@/features/shared/di';

export type CategoryBudgetRowUi = {
  id: string;
  name: string;
  spentOfLimitLabel: string;
  remainingLabel: string;
  percentLabel: string;
  progress: number;
  isWarning: boolean;
  iconKey: BudgetIconKey;
};

export type BudgetWarningUi = {
  title: string;
  percentLabel: string;
  message: string;
};

/** Maps budgets into the Plans / Budgets screen UI state. */
export function useBudgetsViewModel() {
  const [monthPillLabel, setMonthPillLabel] = useState('SEP');
  const [periodTitle, setPeriodTitle] = useState('SEPTEMBER BUDGET');

  const storeVersion = useSyncExternalStore(
    (onStoreChange) => budgetService.subscribe(onStoreChange),
    () => budgetService.getVersion(),
    () => 0
  );

  return useMemo(() => {
    void storeVersion;
    const budgets = budgetService.getBudgetsSync();

    const plannedCents = budgets.reduce((sum, b) => sum + b.amountCents, 0);
    const spentCents = budgets.reduce((sum, b) => sum + b.spentCents, 0);
    const remainingCents = Math.max(0, plannedCents - spentCents);
    const usedPercent =
      plannedCents > 0 ? Math.round((spentCents / plannedCents) * 100) : 0;

    // Mock: ~12 days left in September handoff → matches Figma daily when totals align.
    const daysRemaining = 12;
    const dailyAllowanceCents =
      daysRemaining > 0 ? Math.round(remainingCents / daysRemaining) : 0;

    const categories: CategoryBudgetRowUi[] = budgets.map((budget) => {
      const progress =
        budget.amountCents > 0
          ? Math.min(1, budget.spentCents / budget.amountCents)
          : 0;
      const percent = Math.round(progress * 100);
      const leftCents = Math.max(0, budget.amountCents - budget.spentCents);
      const isWarning =
        budget.alertEnabled && percent >= budget.alertThresholdPercent;

      return {
        id: budget.id,
        name: budget.categoryName,
        spentOfLimitLabel: `${formatMoneyFromCents(budget.spentCents)} of ${formatMoneyFromCents(budget.amountCents)}`,
        remainingLabel: `${formatMoneyFromCents(leftCents)} left`,
        percentLabel: `${percent}%`,
        progress,
        isWarning,
        iconKey: budget.iconKey,
      };
    });

    const warningBudget = budgets.find((budget) => {
      if (!budget.alertEnabled || budget.amountCents <= 0) return false;
      const percent = Math.round((budget.spentCents / budget.amountCents) * 100);
      return percent >= budget.alertThresholdPercent;
    });

    let warning: BudgetWarningUi | null = null;
    if (warningBudget) {
      const percent = Math.round(
        (warningBudget.spentCents / warningBudget.amountCents) * 100
      );
      const leftCents = Math.max(
        0,
        warningBudget.amountCents - warningBudget.spentCents
      );
      const weeklyPaceCents = Math.round(leftCents / 2);
      warning = {
        title: `${warningBudget.categoryName.replace('Food & dining', 'Dining')} is nearing its limit`,
        percentLabel: `${percent}% used`,
        message: `You have ${formatMoneyFromCents(leftCents)} left. Keep this week under ${formatMoneyFromCents(weeklyPaceCents)} to stay on track.`,
      };
    }

    return {
      brandDateLabel: 'September 2026',
      hasUnreadNotifications: true,
      monthPillLabel,
      setMonthPillLabel,
      periodTitle,
      setPeriodTitle,
      spentLabel: formatMoneyFromCents(spentCents),
      plannedLabel: `of ${formatMoneyFromCents(plannedCents)} planned`,
      usedPercentLabel: `${usedPercent}% used`,
      usedProgress: plannedCents > 0 ? spentCents / plannedCents : 0,
      remainingLabel: formatMoneyFromCents(remainingCents),
      dailyAllowanceLabel: formatMoneyFromCents(dailyAllowanceCents),
      warning,
      activeCountLabel: `${categories.length} active`,
      categories,
    };
  }, [monthPillLabel, periodTitle, storeVersion]);
}
