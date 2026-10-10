export type InsightsPeriodKey = '1M' | '3M' | '6M' | 'YTD';

export type WeeklySpendingPair = {
  weekLabel: string;
  previousIntensity: number;
  currentIntensity: number;
  isHighlighted: boolean;
};

export type InsightsCategoryShare = {
  label: string;
  percent: number;
  amountCents: number;
  color: string;
};

export type InsightsTip = {
  title: string;
  usedPercentLabel: string;
  body: string;
};

export type InsightsSnapshot = {
  yearMonth: { year: number; month: number };
  periodRangeLabel: string;
  comparisonLabel: string;
  hasUnreadNotifications: boolean;
  userName: string;
  netCashFlowCents: number;
  netChangePercent: number;
  incomeCents: number;
  expenseCents: number;
  spendingTotalCents: number;
  dailyAverageCents: number;
  spendingChangePercent: number;
  spendingDeltaCents: number;
  currentSeriesLabel: string;
  previousSeriesLabel: string;
  weeklyBars: WeeklySpendingPair[];
  categories: InsightsCategoryShare[];
  tip: InsightsTip;
};
