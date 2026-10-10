import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import {
  ACCOUNT_OPTIONS,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYEE_SUGGESTIONS_EXPENSE,
  PAYEE_SUGGESTIONS_INCOME,
} from '@/data/datasources/finance-store';
import { addTransactionUseCase } from '@/data/di';
import type { TransactionType } from '@/domain/entities/transaction';
import { formatMoneyFromCents } from '@/presentation/utils/format-money';

const NOTE_MAX = 80;
const REFERENCE_DATE = new Date(2026, 8, 30);

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

function formatHeaderDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDetailDate(date: Date): string {
  const startToday = new Date(
    REFERENCE_DATE.getFullYear(),
    REFERENCE_DATE.getMonth(),
    REFERENCE_DATE.getDate()
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

export function useAddTransactionViewModel() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();
  const initialType = parseTypeParam(params.type);

  const [type, setType] = useState<TransactionType>(initialType);
  const [amountText, setAmountText] = useState('');
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const [payee, setPayee] = useState('');
  const [category, setCategory] = useState('');
  const [accountLabel, setAccountLabel] = useState<string>(ACCOUNT_OPTIONS[0].label);
  const [occurredAt, setOccurredAt] = useState(REFERENCE_DATE);
  const [note, setNote] = useState('');
  const [cleared, setCleared] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const amountCents = useMemo(() => parseAmountToCents(amountText), [amountText]);

  const selectedAccount = useMemo(
    () => ACCOUNT_OPTIONS.find((a) => a.label === accountLabel) ?? ACCOUNT_OPTIONS[0],
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
    setAmountText(cleaned);
  }, []);

  const onChangeNote = useCallback((text: string) => {
    setNote(text.slice(0, NOTE_MAX));
  }, []);

  const pickFromOptions = useCallback(
    (title: string, options: readonly string[], onPick: (value: string) => void) => {
      Alert.alert(title, undefined, [
        ...options.map((option) => ({
          text: option,
          onPress: () => onPick(option),
        })),
        { text: 'Cancel', style: 'cancel' as const },
      ]);
    },
    []
  );

  const pickPayee = useCallback(() => {
    const options = type === 'expense' ? PAYEE_SUGGESTIONS_EXPENSE : PAYEE_SUGGESTIONS_INCOME;
    pickFromOptions(payeeFieldLabel, options, setPayee);
  }, [payeeFieldLabel, pickFromOptions, type]);

  const pickCategory = useCallback(() => {
    const options = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
    pickFromOptions('Category', options, setCategory);
  }, [pickFromOptions, type]);

  const pickAccount = useCallback(() => {
    pickFromOptions(
      'Account',
      ACCOUNT_OPTIONS.map((a) => a.label),
      setAccountLabel
    );
  }, [pickFromOptions]);

  const pickDate = useCallback(() => {
    const today = REFERENCE_DATE;
    const yesterday = new Date(2026, 8, 29);
    const earlier = new Date(2026, 8, 28);
    Alert.alert('Date', undefined, [
      { text: formatDetailDate(today), onPress: () => setOccurredAt(today) },
      { text: formatDetailDate(yesterday), onPress: () => setOccurredAt(yesterday) },
      { text: formatDetailDate(earlier), onPress: () => setOccurredAt(earlier) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, []);

  const cancel = useCallback(() => {
    router.back();
  }, [router]);

  const save = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await addTransactionUseCase.execute({
        type,
        amountCents,
        merchant: payee || (type === 'expense' ? 'Untitled expense' : 'Untitled income'),
        category: category || (type === 'expense' ? 'Other' : 'Other'),
        accountLabel,
        occurredAt,
        note,
        cleared,
      });
      router.back();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save transaction.';
      Alert.alert('Save failed', message);
    } finally {
      setIsSaving(false);
    }
  }, [
    accountLabel,
    amountCents,
    category,
    cleared,
    isSaving,
    note,
    occurredAt,
    payee,
    router,
    type,
  ]);

  const handleSetType = useCallback((next: TransactionType) => {
    setType(next);
    setCategory('');
    setPayee('');
  }, []);

  return {
    type,
    setType: handleSetType,
    amountText,
    displayAmount,
    isAmountFocused,
    setIsAmountFocused,
    onChangeAmountText,
    amountCardLabel,
    payee,
    payeeFieldLabel,
    pickPayee,
    category: category || 'Select category',
    hasCategory: Boolean(category),
    pickCategory,
    accountLabel,
    accountAvailableLabel,
    pickAccount,
    dateFieldLabel,
    pickDate,
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
    save,
    cancel,
  };
}
