export type ActivityFilterKey = 'all' | 'expenses' | 'income' | 'updates';

export type ActivityIconKey =
  | 'shopping-bag'
  | 'briefcase-business'
  | 'coffee'
  | 'store'
  | 'landmark'
  | 'triangle-alert';

export type ActivityTransactionItem = {
  kind: 'transaction';
  id: string;
  merchant: string;
  category: string;
  type: 'income' | 'expense';
  amountCents: number;
  occurredAt: Date;
  iconKey: ActivityIconKey;
  statusLabel?: string;
};

export type ActivityAccountUpdateItem = {
  kind: 'account_update';
  id: string;
  title: string;
  subtitle: string;
  amountCents?: number;
  occurredAt: Date;
  statusLabel: string;
  iconKey: ActivityIconKey;
};

export type ActivityBudgetAlertItem = {
  kind: 'budget_alert';
  id: string;
  title: string;
  subtitle: string;
  usedPercent: number;
  occurredAt: Date;
  iconKey: ActivityIconKey;
};

export type ActivityItem =
  | ActivityTransactionItem
  | ActivityAccountUpdateItem
  | ActivityBudgetAlertItem;

export type ActivitySnapshot = {
  yearMonth: { year: number; month: number };
  brandDateLabel: string;
  hasUnreadNotifications: boolean;
  monthPillLabel: string;
  periodTitle: string;
  incomeCents: number;
  expenseCents: number;
  accountFilterLabel: string;
  referenceDate: Date;
  items: ActivityItem[];
};
