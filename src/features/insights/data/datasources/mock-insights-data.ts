import { AppColors } from '@/core/theme';
import type { InsightsSnapshot } from '@/features/insights/domain/entities/insights-snapshot';

/** Seed data matching the Figma Insights handoff (September 2026). */
export const MOCK_INSIGHTS: InsightsSnapshot = {
  yearMonth: { year: 2026, month: 9 },
  periodRangeLabel: 'September 1–30, 2026',
  comparisonLabel: 'vs August',
  hasUnreadNotifications: true,
  userName: 'Maya',
  netCashFlowCents: 369_170,
  netChangePercent: 12.4,
  incomeCents: 584_000,
  expenseCents: 214_830,
  spendingTotalCents: 214_830,
  dailyAverageCents: 7_161,
  spendingChangePercent: 8.6,
  spendingDeltaCents: -20_245,
  currentSeriesLabel: 'September',
  previousSeriesLabel: 'August',
  weeklyBars: [
    {
      weekLabel: 'W1',
      previousIntensity: 34 / 48,
      currentIntensity: 27 / 48,
      isHighlighted: false,
    },
    {
      weekLabel: 'W2',
      previousIntensity: 41 / 48,
      currentIntensity: 36 / 48,
      isHighlighted: false,
    },
    {
      weekLabel: 'W3',
      previousIntensity: 30 / 48,
      currentIntensity: 23 / 48,
      isHighlighted: false,
    },
    {
      weekLabel: 'W4',
      previousIntensity: 44 / 48,
      currentIntensity: 38 / 48,
      isHighlighted: true,
    },
  ],
  categories: [
    {
      label: 'Housing',
      percent: 42,
      amountCents: 90_229,
      color: AppColors.categoryHousing,
    },
    {
      label: 'Food & dining',
      percent: 26,
      amountCents: 55_856,
      color: AppColors.categoryDining,
    },
    {
      label: 'Transport',
      percent: 14,
      amountCents: 30_076,
      color: AppColors.categoryTransport,
    },
    {
      label: 'Other',
      percent: 18,
      amountCents: 38_669,
      color: AppColors.categoryOther,
    },
  ],
  tip: {
    title: 'Dining budget watch',
    usedPercentLabel: '82% used',
    body: 'Maya, spend under $42 this week to stay within your September dining budget.',
  },
};
