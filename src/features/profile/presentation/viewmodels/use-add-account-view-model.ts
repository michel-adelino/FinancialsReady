import { useCallback, useMemo, useState } from 'react';

import { formatMoneyFromCents } from '@/core/utils/format-money';
import type { AccountType } from '@/features/profile/domain/entities/account';

const NOTE_MAX = 80;

const TYPE_LABELS: Record<AccountType, string> = {
  bank: 'Bank',
  cash: 'Cash',
  credit: 'Credit',
  savings: 'Savings',
};

function parseAmountToCents(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  if (!cleaned) return 0;
  const value = Number.parseFloat(cleaned);
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 100);
}

/** Holds Add Account form state and derived labels. */
export function useAddAccountViewModel() {
  const [type, setType] = useState<AccountType>('bank');
  const [amountText, setAmountText] = useState('');
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const [name, setName] = useState('Everyday checking');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [currencyLabel, setCurrencyLabel] = useState('US Dollar (USD)');
  const [institution, setInstitution] = useState('');
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const openingBalanceCents = useMemo(() => parseAmountToCents(amountText), [amountText]);
  const displayAmount = amountText.length > 0 ? amountText : '0';
  const noteCountLabel = `${note.length} / ${NOTE_MAX}`;
  const typeLabel = TYPE_LABELS[type];
  const summaryLine = `${typeLabel} account · ${currencyCode} · ${formatMoneyFromCents(openingBalanceCents)} opening balance`;

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

  const onChangeName = useCallback((text: string) => {
    setName(text);
  }, []);

  return {
    type,
    setType,
    typeLabel,
    displayAmount,
    openingBalanceCents,
    isAmountFocused,
    setIsAmountFocused,
    onChangeAmountText,
    name,
    onChangeName,
    currencyCode,
    currencyLabel,
    setCurrencyCode,
    setCurrencyLabel,
    institution,
    setInstitution,
    note,
    onChangeNote,
    noteCountLabel,
    noteMax: NOTE_MAX,
    summaryLine,
    isSaving,
    setIsSaving,
  };
}
