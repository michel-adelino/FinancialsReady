import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useTransactionDetailsViewModel } from '@/features/transaction-details/presentation/viewmodels/use-transaction-details-view-model';

/** Handles Transaction Details intents (navigation, edit/delete stubs). */
export function useTransactionDetailsController() {
  const router = useRouter();
  const viewModel = useTransactionDetailsViewModel();

  const back = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/');
  }, [router]);

  const onEdit = useCallback(() => {
    Alert.alert('Edit', 'Edit transaction coming soon.');
  }, []);

  const onDelete = useCallback(() => {
    Alert.alert('Delete', 'Delete transaction coming soon.');
  }, []);

  return {
    ...viewModel,
    back,
    onEdit,
    onDelete,
  };
}
