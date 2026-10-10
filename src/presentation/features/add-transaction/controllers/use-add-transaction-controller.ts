import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { transactionService } from '@/data/di';
import {
  formatDetailDate,
  REFERENCE_DATE,
  useAddTransactionViewModel,
} from '@/presentation/features/add-transaction/viewmodels/use-add-transaction-view-model';

/** Handles Add Transaction intents via TransactionService and navigation. */
export function useAddTransactionController() {
  const router = useRouter();
  const viewModel = useAddTransactionViewModel();

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

  const {
    isSaving,
    setIsSaving,
    type,
    amountCents,
    payee,
    category,
    accountLabel,
    occurredAt,
    note,
    cleared,
    setOccurredAt,
    setPayee,
    setCategory,
    setAccountLabel,
    payeeFieldLabel,
  } = viewModel;

  const pickPayee = useCallback(() => {
    pickFromOptions(
      payeeFieldLabel,
      transactionService.getPayeeSuggestions(type),
      setPayee
    );
  }, [payeeFieldLabel, pickFromOptions, setPayee, type]);

  const pickCategory = useCallback(() => {
    pickFromOptions('Category', transactionService.getCategories(type), setCategory);
  }, [pickFromOptions, setCategory, type]);

  const pickAccount = useCallback(() => {
    pickFromOptions(
      'Account',
      transactionService.getAccounts().map((account) => account.label),
      setAccountLabel
    );
  }, [pickFromOptions, setAccountLabel]);

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
  }, [setOccurredAt]);

  const cancel = useCallback(() => {
    router.back();
  }, [router]);

  const save = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await transactionService.addTransaction({
        type,
        amountCents,
        merchant: payee || (type === 'expense' ? 'Untitled expense' : 'Untitled income'),
        category: category || 'Other',
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
    setIsSaving,
    type,
  ]);

  return {
    type: viewModel.type,
    setType: viewModel.setType,
    displayAmount: viewModel.displayAmount,
    isAmountFocused: viewModel.isAmountFocused,
    setIsAmountFocused: viewModel.setIsAmountFocused,
    onChangeAmountText: viewModel.onChangeAmountText,
    amountCardLabel: viewModel.amountCardLabel,
    payee: viewModel.payee,
    payeeFieldLabel: viewModel.payeeFieldLabel,
    pickPayee,
    category: viewModel.categoryLabel,
    hasCategory: viewModel.hasCategory,
    pickCategory,
    accountLabel: viewModel.accountLabel,
    accountAvailableLabel: viewModel.accountAvailableLabel,
    pickAccount,
    dateFieldLabel: viewModel.dateFieldLabel,
    pickDate,
    note: viewModel.note,
    onChangeNote: viewModel.onChangeNote,
    noteCountLabel: viewModel.noteCountLabel,
    noteMax: viewModel.noteMax,
    cleared: viewModel.cleared,
    setCleared: viewModel.setCleared,
    saveButtonLabel: viewModel.saveButtonLabel,
    summaryLine: viewModel.summaryLine,
    headerDateLabel: viewModel.headerDateLabel,
    isSaving: viewModel.isSaving,
    save,
    cancel,
  };
}
