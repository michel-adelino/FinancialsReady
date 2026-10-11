export type ProfileUser = {
  id: string;
  fullName: string;
  email: string;
  initials: string;
  planLabel: string;
  renewsShort: string;
  renewsLong: string;
};

export type ProfileSnapshot = {
  yearMonth: { year: number; month: number };
  hasUnreadNotifications: boolean;
  user: ProfileUser;
  currencyCode: string;
  currencyName: string;
  monthlyBudgetCents: number;
  budgetUsedPercent: number;
  accountsConnected: number;
  categoriesActive: number;
  notificationsEnabled: boolean;
  versionLabel: string;
};
