import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useAddAccountViewModel } from '@/features/profile/presentation/viewmodels/use-add-account-view-model';
import { accountsService } from '@/features/shared/di';

/** Handles Add Account intents via AccountsService and navigation. */
export function useAddAccountController() {
  const router = useRouter();
  const viewModel = useAddAccountViewModel();

  const {
    isSaving,
    setIsSaving,
    type,
    openingBalanceCents,
    name,
    currencyCode,
    institution,
    note,
    setCurrencyCode,
    setCurrencyLabel,
    setInstitution,
  } = viewModel;

  const cancel = useCallback(() => {
    router.back();
  }, [router]);

  const pickCurrency = useCallback(() => {
    Alert.alert('Currency', undefined, [
      {
        text: 'US Dollar (USD)',
        onPress: () => {
          setCurrencyCode('USD');
          setCurrencyLabel('US Dollar (USD)');
        },
      },
      {
        text: 'Euro (EUR)',
        onPress: () => {
          setCurrencyCode('EUR');
          setCurrencyLabel('Euro (EUR)');
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [setCurrencyCode, setCurrencyLabel]);

  const pickInstitution = useCallback(() => {
    Alert.alert('Institution', undefined, [
      { text: 'Chase', onPress: () => setInstitution('Chase') },
      { text: 'Bank of America', onPress: () => setInstitution('Bank of America') },
      { text: 'Clear', onPress: () => setInstitution('') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [setInstitution]);

  const save = useCallback(() => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      accountsService.addAccount({
        name: name.trim() || 'Untitled account',
        type,
        openingBalanceCents,
        currencyCode,
        institution: institution || undefined,
        note,
      });
      router.back();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save account.';
      Alert.alert('Save failed', message);
    } finally {
      setIsSaving(false);
    }
  }, [
    currencyCode,
    institution,
    isSaving,
    name,
    note,
    openingBalanceCents,
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
    name: viewModel.name,
    onChangeName: viewModel.onChangeName,
    currencyLabel: viewModel.currencyLabel,
    pickCurrency,
    institution: viewModel.institution,
    pickInstitution,
    note: viewModel.note,
    onChangeNote: viewModel.onChangeNote,
    noteCountLabel: viewModel.noteCountLabel,
    noteMax: viewModel.noteMax,
    summaryLine: viewModel.summaryLine,
    isSaving: viewModel.isSaving,
    save,
    cancel,
  };
}
