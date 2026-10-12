export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly';

export type BudgetIconKey = 'home' | 'utensils' | 'car' | 'shopping-bag';

export type Budget = {
  id: string;
  amountCents: number;
  spentCents: number;
  categoryId: string;
  categoryName: string;
  period: BudgetPeriod;
  resetsLabel: string;
  alertEnabled: boolean;
  alertThresholdPercent: number;
  currencyCode: string;
  iconKey: BudgetIconKey;
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
  iconKey?: BudgetIconKey;
};
