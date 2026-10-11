import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

import { formatMoneyFromCents, maskMoney } from '@/core/utils/format-money';
import type { Account } from '@/features/profile/domain/entities/account';
import { accountsService } from '@/features/shared/di';

export type AccountRowUi = {
  id: string;
  name: string;
  subtitle: string;
  balanceLabel: string;
  statusLabel: string;
  isCredit: boolean;
  type: Account['type'];
};

export type AccountsUiState = {
  sourcesCountLabel: string;
  introTitle: string;
  introSubtitle: string;
  isBalanceHidden: boolean;
  totalLabel: string;
  cashSavingsLabel: string;
  creditBalanceLabel: string;
  syncedLabel: string;
  activeCountLabel: string;
  accounts: AccountRowUi[];
  defaultAccountName: string;
  defaultAccountSubtitle: string;
  toggleBalanceVisibility: () => void;
};

/** Maps accounts domain data into Accounts screen UI state. */
export function useAccountsViewModel(): AccountsUiState {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const storeVersion = useSyncExternalStore(
    (onStoreChange) => accountsService.subscribe(onStoreChange),
    () => accountsService.getVersion(),
    () => 0
  );

  const toggleBalanceVisibility = useCallback(() => {
    setIsBalanceHidden((prev) => !prev);
  }, []);

  const derived = useMemo(() => {
    void storeVersion;
    const snapshot = accountsService.getSnapshotSync();
    const money = (cents: number, signed = false) =>
      isBalanceHidden ? maskMoney() : formatMoneyFromCents(cents, signed);

    const defaultAccount =
      snapshot.accounts.find((account) => account.id === snapshot.defaultAccountId) ??
      snapshot.accounts[0];

    return {
      sourcesCountLabel: `${snapshot.accounts.length} financial sources`,
      introTitle: 'Your money, in one place',
      introSubtitle: 'Balances used across Home, budgets and transactions',
      isBalanceHidden,
      totalLabel: money(snapshot.totalCents),
      cashSavingsLabel: money(snapshot.cashAndSavingsCents),
      creditBalanceLabel: money(snapshot.creditBalanceCents, true),
      syncedLabel: snapshot.syncedLabel,
      activeCountLabel: `${snapshot.accounts.length} ACTIVE`,
      accounts: snapshot.accounts.map((account) => ({
        id: account.id,
        name: account.name,
        subtitle: account.subtitle,
        balanceLabel: money(account.balanceCents, account.type === 'credit'),
        statusLabel:
          isBalanceHidden && account.type === 'credit' ? '••••••' : account.statusLabel,
        isCredit: account.type === 'credit',
        type: account.type,
      })),
      defaultAccountName: defaultAccount?.name ?? 'No account',
      defaultAccountSubtitle: `${defaultAccount?.name ?? 'None'} is selected for new expenses`,
    };
  }, [isBalanceHidden, storeVersion]);

  return {
    ...derived,
    toggleBalanceVisibility,
  };
}
