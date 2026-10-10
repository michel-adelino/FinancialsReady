import { useMemo, useState } from 'react';

import { formatMonthYear } from '@/core/utils/format-date';
import { formatMoneyFromCents } from '@/core/utils/format-money';
import { insightsService } from '@/features/shared/di';
import type {
  InsightsCategoryShare,
  InsightsPeriodKey,
  WeeklySpendingPair,
} from '@/features/insights/domain/entities/insights-snapshot';

export type InsightsUiState = {
  brandDateLabel: string;
  hasUnreadNotifications: boolean;
  periodRangeLabel: string;
  comparisonLabel: string;
  selectedPeriod: InsightsPeriodKey;
  setSelectedPeriod: (period: InsightsPeriodKey) => void;
  netCashFlowLabel: string;
  netChangePercentLabel: string;
  incomeLabel: string;
  expenseLabel: string;
  spendingTotalLabel: string;
  dailyAverageLabel: string;
  spendingChangeLabel: string;
  spendingDeltaLabel: string;
  currentSeriesLabel: string;
  previousSeriesLabel: string;
  weeklyBars: WeeklySpendingPair[];
  categories: InsightsCategoryShare[];
  categoriesTotalLabel: string;
  tipTitle: string;
  tipUsedLabel: string;
  tipBody: string;
};

/** Maps Insights domain data into screen-ready UI state. */
export function useInsightsViewModel(): InsightsUiState {
  const [selectedPeriod, setSelectedPeriod] = useState<InsightsPeriodKey>('1M');
  const snapshot = useMemo(() => insightsService.getSnapshot(), []);

  return useMemo(() => {
    return {
      brandDateLabel: formatMonthYear(
        snapshot.yearMonth.year,
        snapshot.yearMonth.month
      ),
      hasUnreadNotifications: snapshot.hasUnreadNotifications,
      periodRangeLabel: snapshot.periodRangeLabel,
      comparisonLabel: snapshot.comparisonLabel,
      selectedPeriod,
      setSelectedPeriod,
      netCashFlowLabel: formatMoneyFromCents(snapshot.netCashFlowCents, true),
      netChangePercentLabel: `${snapshot.netChangePercent}%`,
      incomeLabel: formatMoneyFromCents(snapshot.incomeCents),
      expenseLabel: formatMoneyFromCents(snapshot.expenseCents),
      spendingTotalLabel: formatMoneyFromCents(snapshot.spendingTotalCents),
      dailyAverageLabel: `${formatMoneyFromCents(snapshot.dailyAverageCents)} / day`,
      spendingChangeLabel: `${snapshot.spendingChangePercent}% lower`,
      spendingDeltaLabel: formatMoneyFromCents(snapshot.spendingDeltaCents, true),
      currentSeriesLabel: snapshot.currentSeriesLabel,
      previousSeriesLabel: snapshot.previousSeriesLabel,
      weeklyBars: snapshot.weeklyBars,
      categories: snapshot.categories,
      categoriesTotalLabel: `${formatMoneyFromCents(snapshot.spendingTotalCents)} total`,
      tipTitle: snapshot.tip.title,
      tipUsedLabel: snapshot.tip.usedPercentLabel,
      tipBody: snapshot.tip.body,
    };
  }, [selectedPeriod, snapshot]);
}
