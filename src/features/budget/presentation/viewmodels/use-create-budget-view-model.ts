import { useCallback, useMemo, useState } from 'react';

import { formatMoneyFromCents } from '@/core/utils/format-money';
import type { BudgetPeriod } from '@/features/budget/domain/entities/budget';

const PERIOD_LABELS: Record<BudgetPeriod, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

function parseAmountToCents(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  if (!cleaned) return 0;
  const value = Number.parseFloat(cleaned);
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 100);
}

/** Holds Create Budget form state and derived labels. */
export function useCreateBudgetViewModel() {
  const [amountText, setAmountText] = useState('450');
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const [categoryId, setCategoryId] = useState('cat-food');
  const [categoryName, setCategoryName] = useState('Food & dining');
  const [period, setPeriod] = useState<BudgetPeriod>('monthly');
  const [resetsLabel, setResetsLabel] = useState('1st day of each month');
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [alertThresholdPercent, setAlertThresholdPercent] = useState(80);
  const [isSaving, setIsSaving] = useState(false);

  const amountCents = useMemo(() => parseAmountToCents(amountText), [amountText]);
  const displayAmount = amountText.length > 0 ? amountText : '0';
  const periodLabel = PERIOD_LABELS[period];
  const statusBadge = amountCents > 0 ? 'Ready' : null;

  const alertAmountCents = Math.round((amountCents * alertThresholdPercent) / 100);
  const remainingCents = Math.max(0, amountCents - alertAmountCents);

  const alertSummaryTitle = `Alert at ${formatMoneyFromCents(alertAmountCents)} spent`;
  const alertSummaryBody = `You'll still have ${formatMoneyFromCents(remainingCents)} left in ${categoryName}.`;
  const summaryLine = `${formatMoneyFromCents(amountCents)} ${periodLabel.toLowerCase()} for ${categoryName}`;
  const thresholdPillLabel = `${alertThresholdPercent}%`;

  const onChangeAmountText = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    setAmountText(cleaned);
  }, []);

  return {
    amountText,
    displayAmount,
    amountCents,
    isAmountFocused,
    setIsAmountFocused,
    onChangeAmountText,
    statusBadge,
    categoryId,
    setCategoryId,
    categoryName,
    setCategoryName,
    period,
    setPeriod,
    periodLabel,
    resetsLabel,
    setResetsLabel,
    alertEnabled,
    setAlertEnabled,
    alertThresholdPercent,
    setAlertThresholdPercent,
    thresholdPillLabel,
    alertSummaryTitle,
    alertSummaryBody,
    summaryLine,
    isSaving,
    setIsSaving,
  };
}
