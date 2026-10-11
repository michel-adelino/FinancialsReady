import type { Account, AccountsSnapshot } from '@/features/profile/domain/entities/account';

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc-checking',
    name: 'Everyday checking',
    type: 'bank',
    balanceCents: 642_820,
    subtitle: 'Primary · synced just now',
    statusLabel: 'Available',
    institution: 'Primary bank',
    currencyCode: 'USD',
  },
  {
    id: 'acc-cash',
    name: 'Cash wallet',
    type: 'cash',
    balanceCents: 48_000,
    subtitle: 'Manual · updated today',
    statusLabel: 'On hand',
    currencyCode: 'USD',
  },
  {
    id: 'acc-visa',
    name: 'Visa • 2048',
    type: 'credit',
    balanceCents: -128_355,
    availableCents: 321_600,
    subtitle: 'Credit card · due Oct 14',
    statusLabel: '$3,216 available',
    institution: 'Visa',
    currencyCode: 'USD',
  },
  {
    id: 'acc-savings',
    name: 'High-yield savings',
    type: 'savings',
    balanceCents: 705_580,
    subtitle: 'Savings · 4.25% APY',
    statusLabel: 'Synced',
    institution: 'Savings bank',
    currencyCode: 'USD',
  },
];

export const MOCK_ACCOUNTS_SNAPSHOT: AccountsSnapshot = {
  accounts: MOCK_ACCOUNTS,
  defaultAccountId: 'acc-visa',
  cashAndSavingsCents: 1_396_400,
  creditBalanceCents: -128_355,
  totalCents: 1_268_045,
  syncedLabel: 'Synced now',
};
