export type AccountType = 'bank' | 'cash' | 'credit' | 'savings';

export type Account = {
  id: string;
  name: string;
  type: AccountType;
  /** Signed balance in cents (credit debt is negative). */
  balanceCents: number;
  /** Extra credit line available in cents (credit accounts). */
  availableCents?: number;
  subtitle: string;
  statusLabel: string;
  institution?: string;
  note?: string;
  currencyCode: string;
};

export type AddAccountInput = {
  name: string;
  type: AccountType;
  openingBalanceCents: number;
  currencyCode: string;
  institution?: string;
  note: string;
};

export type AccountsSnapshot = {
  accounts: Account[];
  defaultAccountId: string;
  cashAndSavingsCents: number;
  creditBalanceCents: number;
  totalCents: number;
  syncedLabel: string;
};
