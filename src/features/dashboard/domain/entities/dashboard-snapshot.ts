import type { BalanceSummary } from './balance-summary';
import type { SpendingOverview } from './spending-overview';
import type { Transaction } from '@/features/shared/domain/entities/transaction';
import type { User } from './user';

export type YearMonth = {
  year: number;
  month: number; // 1–12
};

export type DashboardSnapshot = {
  user: User;
  yearMonth: YearMonth;
  subtitle: string;
  balance: BalanceSummary;
  spending: SpendingOverview;
  recentTransactions: Transaction[];
  hasUnreadNotifications: boolean;
};
