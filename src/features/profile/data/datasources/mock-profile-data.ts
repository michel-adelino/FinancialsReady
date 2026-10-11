import type { ProfileSnapshot } from '@/features/profile/domain/entities/profile-snapshot';

export const MOCK_PROFILE: ProfileSnapshot = {
  yearMonth: { year: 2026, month: 9 },
  hasUnreadNotifications: true,
  user: {
    id: 'user-maya',
    fullName: 'Maya Chen',
    email: 'maya.chen@email.com',
    initials: 'MC',
    planLabel: 'READY PLUS',
    renewsShort: 'Oct 18',
    renewsLong: 'October 18',
  },
  currencyCode: 'USD',
  currencyName: 'US Dollar',
  monthlyBudgetCents: 320_000,
  budgetUsedPercent: 67,
  accountsConnected: 3,
  categoriesActive: 18,
  notificationsEnabled: true,
  versionLabel: 'Financials Ready 6.2 · Your data is encrypted.',
};
