import { useMemo, useSyncExternalStore } from 'react';

import { formatMonthYear } from '@/core/utils/format-date';
import { formatMoneyFromCents } from '@/core/utils/format-money';
import { accountsService, profileService } from '@/features/shared/di';

export type ProfileUiState = {
  brandDateLabel: string;
  hasUnreadNotifications: boolean;
  fullName: string;
  email: string;
  initials: string;
  planBadgeLabel: string;
  currencyCode: string;
  currencyName: string;
  budgetAmountLabel: string;
  budgetUsedLabel: string;
  accountsSubtitle: string;
  categoriesSubtitle: string;
  planBillingSubtitle: string;
  notificationsEnabled: boolean;
  versionLabel: string;
};

/** Maps profile domain data into screen-ready UI state. */
export function useProfileViewModel(): ProfileUiState {
  const profileVersion = useSyncExternalStore(
    (onStoreChange) => profileService.subscribe(onStoreChange),
    () => profileService.getVersion(),
    () => 0
  );

  const accountsVersion = useSyncExternalStore(
    (onStoreChange) => accountsService.subscribe(onStoreChange),
    () => accountsService.getVersion(),
    () => 0
  );

  return useMemo(() => {
    void profileVersion;
    void accountsVersion;
    const snapshot = profileService.getProfileSync();
    const { user } = snapshot;
    const accountsConnected = accountsService.getAccountCount();

    return {
      brandDateLabel: formatMonthYear(
        snapshot.yearMonth.year,
        snapshot.yearMonth.month
      ),
      hasUnreadNotifications: snapshot.hasUnreadNotifications,
      fullName: user.fullName,
      email: user.email,
      initials: user.initials,
      planBadgeLabel: `${user.planLabel} · Renews ${user.renewsShort}`,
      currencyCode: snapshot.currencyCode,
      currencyName: snapshot.currencyName,
      budgetAmountLabel: formatMoneyFromCents(snapshot.monthlyBudgetCents),
      budgetUsedLabel: `${snapshot.budgetUsedPercent}% used`,
      accountsSubtitle: `${accountsConnected} connected`,
      categoriesSubtitle: `${snapshot.categoriesActive} active`,
      planBillingSubtitle: `Ready Plus · renews ${user.renewsLong}`,
      notificationsEnabled: snapshot.notificationsEnabled,
      versionLabel: snapshot.versionLabel,
    };
  }, [accountsVersion, profileVersion]);
}
