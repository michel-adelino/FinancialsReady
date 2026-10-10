import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { formatTransactionWhen } from '@/core/utils/format-date';
import { formatMoneyFromCents } from '@/core/utils/format-money';
import { transactionService } from '@/features/shared/di';
import type { TransactionIconKey } from '@/features/shared/domain/entities/transaction';

export const REFERENCE_DATE = new Date(2026, 8, 30);

const GROCERIES_BUDGET = {
  title: 'September groceries',
  spentLabel: '$428.62 of $650 monthly budget',
  percentLabel: '66%',
  progress: 0.66,
} as const;

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function formatDisplayId(occurredAt: Date): string {
  const mm = pad2(occurredAt.getMonth() + 1);
  const dd = pad2(occurredAt.getDate());
  const hh = pad2(occurredAt.getHours());
  const min = pad2(occurredAt.getMinutes());
  return `TXN-${mm}${dd}-${hh}${min}`;
}

function formatDateTime(date: Date): string {
  const day = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${day} • ${time}`;
}

function formatSavedAt(date: Date): string {
  const day = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `Saved ${day} at ${time} · Manually added`;
}

function paymentMethodKind(accountLabel: string): string {
  if (accountLabel.toLowerCase().includes('visa') || accountLabel.toLowerCase().includes('card')) {
    return 'Credit card';
  }
  if (accountLabel.toLowerCase().includes('cash')) {
    return 'Cash';
  }
  return 'Bank account';
}

export type TransactionDetailsUi = {
  found: boolean;
  id: string;
  statusLabel: string;
  headerSubtitle: string;
  merchant: string;
  categorySubtitle: string;
  amountLabel: string;
  isIncome: boolean;
  cleared: boolean;
  accountLabel: string;
  currencyCode: string;
  whenLabel: string;
  iconKey: TransactionIconKey;
  category: string;
  paymentMethodLabel: string;
  paymentMethodKind: string;
  dateTimeLabel: string;
  note: string;
  noteFooter: string;
  hasNote: boolean;
  recordIdLabel: string;
  savedMetaLabel: string;
  syncLabel: string;
  showBudgetCard: boolean;
  budgetTitle: string;
  budgetSpentLabel: string;
  budgetPercentLabel: string;
  budgetProgress: number;
  deleteHint: string;
  editButtonLabel: string;
};

/** Maps a transaction id into screen-ready detail labels. */
export function useTransactionDetailsViewModel(): TransactionDetailsUi {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return useMemo(() => {
    const empty: TransactionDetailsUi = {
      found: false,
      id: id ?? '',
      statusLabel: '',
      headerSubtitle: 'Transaction',
      merchant: '',
      categorySubtitle: '',
      amountLabel: '',
      isIncome: false,
      cleared: false,
      accountLabel: '',
      currencyCode: 'USD',
      whenLabel: '',
      iconKey: 'store',
      category: '',
      paymentMethodLabel: '',
      paymentMethodKind: '',
      dateTimeLabel: '',
      note: '',
      noteFooter: '',
      hasNote: false,
      recordIdLabel: '',
      savedMetaLabel: '',
      syncLabel: 'Synced',
      showBudgetCard: false,
      budgetTitle: '',
      budgetSpentLabel: '',
      budgetPercentLabel: '',
      budgetProgress: 0,
      deleteHint: '',
      editButtonLabel: 'Edit transaction',
    };

    if (!id) return empty;

    const tx = transactionService.getById(id);
    if (!tx) return empty;

    const isIncome = tx.type === 'income';
    const cleared = tx.cleared ?? false;
    const accountLabel = tx.accountLabel ?? 'Visa • 2048';
    const savedAt = new Date(tx.occurredAt.getTime() + 2 * 60 * 1000);
    const monthName = tx.occurredAt.toLocaleDateString('en-US', { month: 'long' });
    const showBudgetCard = !isIncome && tx.category.toLowerCase() === 'groceries';

    const statusParts: string[] = [];
    if (cleared) statusParts.push('CLEARED');
    statusParts.push(isIncome ? 'INCOME' : 'EXPENSE');

    return {
      found: true,
      id: tx.id,
      statusLabel: statusParts.join(' '),
      headerSubtitle: isIncome ? 'Saved income' : 'Saved expense',
      merchant: tx.merchant,
      categorySubtitle: isIncome
        ? `${tx.category} deposit`
        : `${tx.category} purchase`,
      amountLabel: formatMoneyFromCents(tx.amountCents, true),
      isIncome,
      cleared,
      accountLabel,
      currencyCode: 'USD',
      whenLabel: formatTransactionWhen(tx.occurredAt, REFERENCE_DATE),
      iconKey: tx.iconKey,
      category: tx.category,
      paymentMethodLabel: accountLabel,
      paymentMethodKind: paymentMethodKind(accountLabel),
      dateTimeLabel: formatDateTime(tx.occurredAt),
      note: tx.note?.trim() ?? '',
      noteFooter: isIncome ? 'Added with this income.' : 'Added with this expense.',
      hasNote: Boolean(tx.note?.trim()),
      recordIdLabel: formatDisplayId(tx.occurredAt),
      savedMetaLabel: formatSavedAt(savedAt),
      syncLabel: 'Synced',
      showBudgetCard,
      budgetTitle: showBudgetCard ? GROCERIES_BUDGET.title : '',
      budgetSpentLabel: showBudgetCard ? GROCERIES_BUDGET.spentLabel : '',
      budgetPercentLabel: showBudgetCard ? GROCERIES_BUDGET.percentLabel : '',
      budgetProgress: showBudgetCard ? GROCERIES_BUDGET.progress : 0,
      deleteHint: `Deleting removes this ${isIncome ? 'income' : 'expense'} from ${monthName} totals.`,
      editButtonLabel: 'Edit transaction',
    };
  }, [id]);
}
