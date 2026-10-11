import { type Href, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useAccountsViewModel } from '@/features/profile/presentation/viewmodels/use-accounts-view-model';

/** Handles Accounts screen intents. */
export function useAccountsController() {
  const router = useRouter();
  const viewModel = useAccountsViewModel();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const onManage = useCallback(() => {
    Alert.alert('Manage', 'Account management coming soon.');
  }, []);

  const onAccountPress = useCallback((name: string) => {
    Alert.alert(name, 'Account details coming soon.');
  }, []);

  const onDefaultAccountPress = useCallback(() => {
    Alert.alert('Default account', 'Default account picker coming soon.');
  }, []);

  const onHelpPress = useCallback(() => {
    Alert.alert(
      'How balances are calculated',
      'Cash and savings are summed as assets. Credit balances reduce your total.'
    );
  }, []);

  const onAddAccount = useCallback(() => {
    router.push('/add-account' as Href);
  }, [router]);

  return {
    ...viewModel,
    goBack,
    onManage,
    onAccountPress,
    onDefaultAccountPress,
    onHelpPress,
    onAddAccount,
  };
}
