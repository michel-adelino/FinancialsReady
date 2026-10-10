export type DailySpendingBar = {
  dayLabel: string;
  /** Relative height 0–1 for chart rendering. */
  intensity: number;
  isHighlighted: boolean;
};

export type SpendingCategoryShare = {
  label: string;
  percent: number;
};

export type SpendingOverview = {
  totalCents: number;
  dailyAverageCents: number;
  budgetUsedPercent: number;
  periodLabel: string;
  dailyBars: DailySpendingBar[];
  categories: SpendingCategoryShare[];
};
