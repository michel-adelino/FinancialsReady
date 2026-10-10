import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { formatMoneyFromCents } from '@/core/utils/format-money';
import { transactionService } from '@/features/shared/di';
import type { TransactionType } from '@/features/shared/domain/entities/transaction';

export const NOTE_MAX = 80;
export const REFERENCE_DATE = new Date(2026, 8, 30);

function parseTypeParam(value: string | string[] | undefined): TransactionType {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === 'income' ? 'income' : 'expense';
}

function parseAmountToCents(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  if (!cleaned) return 0;
  const value = Number.parseFloat(cleaned);
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 100);
}

export function formatHeaderDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDetailDate(date: Date, referenceDate = REFERENCE_DATE): string {
  const startToday = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );
  const startTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = Math.round(
    (startToday.getTime() - startTarget.getTime()) / (1000 * 60 * 60 * 24)
  );
  const rest = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  if (diff === 0) return `Today, ${rest}`;
  if (diff === 1) return `Yesterday, ${rest}`;
  return rest;
}

/** Holds Add Transaction form state and derived labels. */
export function useAddTransactionViewModel() {
  const params = useLocalSearchParams<{ type?: string }>();
  const initialType = parseTypeParam(params.type);
  const defaultAccount = transactionService.getDefaultAccount();

  const [type, setTypeState] = useState<TransactionType>(initialType);
  const [amountText, setAmountText] = useState('');
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const [payee, setPayee] = useState('');
  const [category, setCategory] = useState('');
  const [accountLabel, setAccountLabel] = useState<string>(defaultAccount.label);
  const [occurredAt, setOccurredAt] = useState(REFERENCE_DATE);
  const [note, setNote] = useState('');
  const [cleared, setCleared] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const amountCents = useMemo(() => parseAmountToCents(amountText), [amountText]);
  const selectedAccount = useMemo(
    () => transactionService.findAccount(accountLabel),
    [accountLabel]
  );

  const amountCardLabel = type === 'expense' ? 'EXPENSE AMOUNT' : 'INCOME AMOUNT';
  const payeeFieldLabel = type === 'expense' ? 'PAID TO' : 'RECEIVED FROM';
  const saveButtonLabel = type === 'expense' ? 'Save expense' : 'Save income';
  const headerDateLabel = formatHeaderDate(REFERENCE_DATE);
  const dateFieldLabel = formatDetailDate(occurredAt);
  const noteCountLabel = `${note.length} / ${NOTE_MAX}`;
  const displayAmount = amountText.length > 0 ? amountText : '0';
  const summaryLine =
    amountCents > 0
      ? `${formatMoneyFromCents(amountCents)} from ${accountLabel}`
      : `From ${accountLabel}`;
  const accountAvailableLabel = `${formatMoneyFromCents(selectedAccount.availableCents)} available`;

  const onChangeAmountText = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    const integer = (parts[0] ?? '').replace(/^0+(?=\d)/, '');
    const normalized = parts.length > 1 ? `${integer || '0'}.${parts[1]}` : integer;
    setAmountText(normalized);
  }, []);

  const onChangeNote = useCallback((text: string) => {
    setNote(text.slice(0, NOTE_MAX));
  }, []);

  const setType = useCallback((next: TransactionType) => {
    setTypeState(next);
    setCategory('');
    setPayee('');
  }, []);

  return {
    type,
    setType,
    amountText,
    displayAmount,
    amountCents,
    isAmountFocused,
    setIsAmountFocused,
    onChangeAmountText,
    amountCardLabel,
    payee,
    setPayee,
    payeeFieldLabel,
    category,
    setCategory,
    categoryLabel: category || 'Select category',
    hasCategory: Boolean(category),
    accountLabel,
    setAccountLabel,
    accountAvailableLabel,
    occurredAt,
    setOccurredAt,
    dateFieldLabel,
    note,
    onChangeNote,
    noteCountLabel,
    noteMax: NOTE_MAX,
    cleared,
    setCleared,
    saveButtonLabel,
    summaryLine,
    headerDateLabel,
    isSaving,
    setIsSaving,
  };
}
