export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly';

export type Budget = {
  id: string;
  amountCents: number;
  categoryId: string;
  categoryName: string;
  period: BudgetPeriod;
  resetsLabel: string;
  alertEnabled: boolean;
  alertThresholdPercent: number;
  currencyCode: string;
};

export type AddBudgetInput = {
  amountCents: number;
  categoryId: string;
  categoryName: string;
  period: BudgetPeriod;
  resetsLabel: string;
  alertEnabled: boolean;
  alertThresholdPercent: number;
  currencyCode: string;
};
