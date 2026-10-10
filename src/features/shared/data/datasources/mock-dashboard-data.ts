import type { DashboardSnapshot } from '@/features/dashboard/domain/entities/dashboard-snapshot';

/** Seed data matching the Figma dashboard handoff (September 2026). */
export const MOCK_DASHBOARD: DashboardSnapshot = {
  user: {
    id: 'user-maya',
    name: 'Maya',
  },
  yearMonth: {
    year: 2026,
    month: 9,
  },
  subtitle: 'Your money is looking steady.',
  balance: {
    totalCents: 1_268_045,
    changePercent: 6.8,
    incomeCents: 584_000,
    spendingCents: 214_830,
  },
  spending: {
    totalCents: 68_420,
    dailyAverageCents: 9_630,
    budgetUsedPercent: 68,
    periodLabel: 'This week',
    dailyBars: [
      { dayLabel: 'M', intensity: 17 / 42, isHighlighted: false },
      { dayLabel: 'T', intensity: 28 / 42, isHighlighted: false },
      { dayLabel: 'W', intensity: 22 / 42, isHighlighted: false },
      { dayLabel: 'T', intensity: 37 / 42, isHighlighted: true },
      { dayLabel: 'F', intensity: 31 / 42, isHighlighted: false },
      { dayLabel: 'S', intensity: 19 / 42, isHighlighted: false },
      { dayLabel: 'S', intensity: 25 / 42, isHighlighted: false },
    ],
    categories: [
      { label: 'Home', percent: 42 },
      { label: 'Food', percent: 26 },
      { label: 'Other', percent: 32 },
    ],
  },
  recentTransactions: [
    {
      id: 'tx-1',
      merchant: 'Whole Foods Market',
      category: 'Groceries',
      occurredAt: new Date('2026-09-30T08:42:00'),
      amountCents: -8_426,
      iconKey: 'shopping-bag',
      type: 'expense',
      note: 'Weekly grocery run',
      accountLabel: 'Visa • 2048',
      cleared: true,
    },
    {
      id: 'tx-2',
      merchant: 'Acme Studio',
      category: 'Salary',
      occurredAt: new Date('2026-09-29T09:00:00'),
      amountCents: 292_000,
      iconKey: 'briefcase-business',
      type: 'income',
      note: 'September payroll',
      accountLabel: 'Checking • 1182',
      cleared: true,
    },
    {
      id: 'tx-3',
      merchant: 'Fieldwork Coffee',
      category: 'Dining',
      occurredAt: new Date('2026-09-28T10:15:00'),
      amountCents: -680,
      iconKey: 'coffee',
      type: 'expense',
      note: 'Morning coffee',
      accountLabel: 'Visa • 2048',
      cleared: true,
    },
  ],
  hasUnreadNotifications: true,
};
