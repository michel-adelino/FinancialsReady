import { MOCK_DASHBOARD } from '@/features/shared/data/datasources/mock-dashboard-data';
import type { DashboardSnapshot } from '@/features/dashboard/domain/entities/dashboard-snapshot';
import type {
  AddTransactionInput,
  Transaction,
  TransactionIconKey,
} from '@/features/shared/domain/entities/transaction';

function iconForCategory(category: string, type: AddTransactionInput['type']): TransactionIconKey {
  const key = category.toLowerCase();
  if (key.includes('groc')) return 'shopping-bag';
  if (key.includes('din') || key.includes('coffee') || key.includes('food')) return 'coffee';
  if (key.includes('salar') || type === 'income') return 'briefcase-business';
  return 'store';
}

class FinanceStore {
  private snapshot: DashboardSnapshot = structuredClone(MOCK_DASHBOARD);
  private version = 0;
  private listeners = new Set<() => void>();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getVersion() {
    return this.version;
  }

  private notify() {
    this.version += 1;
    this.listeners.forEach((listener) => listener());
  }

  getSnapshot(): DashboardSnapshot {
    return {
      ...this.snapshot,
      balance: { ...this.snapshot.balance },
      spending: {
        ...this.snapshot.spending,
        dailyBars: [...this.snapshot.spending.dailyBars],
        categories: [...this.snapshot.spending.categories],
      },
      recentTransactions: [...this.snapshot.recentTransactions],
      user: { ...this.snapshot.user },
      yearMonth: { ...this.snapshot.yearMonth },
    };
  }

  getTransactionById(id: string): Transaction | null {
    const found = this.snapshot.recentTransactions.find((tx) => tx.id === id);
    return found ? { ...found } : null;
  }

  addTransaction(input: AddTransactionInput): Transaction {
    const signed =
      input.type === 'expense' ? -Math.abs(input.amountCents) : Math.abs(input.amountCents);

    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      merchant: input.merchant.trim(),
      category: input.category,
      occurredAt: input.occurredAt,
      amountCents: signed,
      iconKey: iconForCategory(input.category, input.type),
      type: input.type,
      note: input.note,
      accountLabel: input.accountLabel,
      cleared: input.cleared,
    };

    this.snapshot = {
      ...this.snapshot,
      recentTransactions: [transaction, ...this.snapshot.recentTransactions].slice(0, 10),
      balance: {
        ...this.snapshot.balance,
        totalCents: input.cleared
          ? this.snapshot.balance.totalCents + signed
          : this.snapshot.balance.totalCents,
        incomeCents:
          input.type === 'income'
            ? this.snapshot.balance.incomeCents + Math.abs(input.amountCents)
            : this.snapshot.balance.incomeCents,
        spendingCents:
          input.type === 'expense'
            ? this.snapshot.balance.spendingCents + Math.abs(input.amountCents)
            : this.snapshot.balance.spendingCents,
      },
      spending:
        input.type === 'expense'
          ? {
              ...this.snapshot.spending,
              totalCents: this.snapshot.spending.totalCents + Math.abs(input.amountCents),
            }
          : this.snapshot.spending,
    };

    this.notify();
    return transaction;
  }
}

export const financeStore = new FinanceStore();

export const ACCOUNT_OPTIONS = [
  { label: 'Visa • 2048', availableCents: 321_600 },
  { label: 'Checking • 1182', availableCents: 482_000 },
  { label: 'Cash', availableCents: 24_000 },
] as const;

export const EXPENSE_CATEGORIES = [
  'Groceries',
  'Dining',
  'Home',
  'Transport',
  'Other',
] as const;

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Transfer', 'Other'] as const;

export const PAYEE_SUGGESTIONS_EXPENSE = [
  'Whole Foods Market',
  'Fieldwork Coffee',
  'Amazon',
  'Uber',
] as const;

export const PAYEE_SUGGESTIONS_INCOME = [
  'Acme Studio',
  'Client invoice',
  'Payroll',
] as const;
