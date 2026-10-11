import { MOCK_ACCOUNTS_SNAPSHOT } from '@/features/profile/data/datasources/mock-accounts-data';
import type {
  Account,
  AccountType,
  AccountsSnapshot,
  AddAccountInput,
} from '@/features/profile/domain/entities/account';

function cloneAccount(account: Account): Account {
  return { ...account };
}

function computeTotals(accounts: Account[]) {
  let cashAndSavingsCents = 0;
  let creditBalanceCents = 0;

  for (const account of accounts) {
    if (account.type === 'credit') {
      creditBalanceCents += account.balanceCents;
    } else {
      cashAndSavingsCents += account.balanceCents;
    }
  }

  return {
    cashAndSavingsCents,
    creditBalanceCents,
    totalCents: cashAndSavingsCents + creditBalanceCents,
  };
}

function defaultSubtitle(type: AccountType): string {
  switch (type) {
    case 'bank':
      return 'Bank · just added';
    case 'cash':
      return 'Manual · just added';
    case 'credit':
      return 'Credit card · just added';
    case 'savings':
      return 'Savings · just added';
  }
}

function defaultStatus(type: AccountType, balanceCents: number): string {
  if (type === 'credit') {
    const available = Math.max(0, 500_000 + balanceCents);
    return `$${(available / 100).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} available`;
  }
  if (type === 'cash') return 'On hand';
  return 'Available';
}

/** Mutable in-memory accounts state seeded from the design mock. */
export class AccountsService {
  private accounts: Account[] = MOCK_ACCOUNTS_SNAPSHOT.accounts.map(cloneAccount);
  private defaultAccountId = MOCK_ACCOUNTS_SNAPSHOT.defaultAccountId;
  private version = 0;
  private listeners = new Set<() => void>();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getVersion(): number {
    return this.version;
  }

  private notify() {
    this.version += 1;
    this.listeners.forEach((listener) => listener());
  }

  getSnapshotSync(): AccountsSnapshot {
    const totals = computeTotals(this.accounts);
    return {
      accounts: this.accounts.map(cloneAccount),
      defaultAccountId: this.defaultAccountId,
      cashAndSavingsCents: totals.cashAndSavingsCents,
      creditBalanceCents: totals.creditBalanceCents,
      totalCents: totals.totalCents,
      syncedLabel: 'Synced now',
    };
  }

  getAccountCount(): number {
    return this.accounts.length;
  }

  getDefaultAccount(): Account | undefined {
    return this.accounts.find((account) => account.id === this.defaultAccountId);
  }

  setDefaultAccountId(id: string) {
    if (!this.accounts.some((account) => account.id === id)) return;
    this.defaultAccountId = id;
    this.notify();
  }

  addAccount(input: AddAccountInput): Account {
    const name = input.name.trim();
    if (!name) {
      throw new Error('Account name is required.');
    }

    const signedBalance =
      input.type === 'credit'
        ? -Math.abs(input.openingBalanceCents)
        : Math.abs(input.openingBalanceCents);

    const account: Account = {
      id: `acc-${Date.now()}`,
      name,
      type: input.type,
      balanceCents: signedBalance,
      availableCents:
        input.type === 'credit' ? Math.max(0, 500_000 + signedBalance) : undefined,
      subtitle: input.institution
        ? `${input.institution} · just added`
        : defaultSubtitle(input.type),
      statusLabel: defaultStatus(input.type, signedBalance),
      institution: input.institution,
      note: input.note || undefined,
      currencyCode: input.currencyCode || 'USD',
    };

    this.accounts = [account, ...this.accounts];
    this.notify();
    return account;
  }
}
