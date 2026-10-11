import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useProfileViewModel } from '@/features/profile/presentation/viewmodels/use-profile-view-model';
import { profileService } from '@/features/shared/di';

/** Handles Profile & settings intents on top of ViewModel state. */
export function useProfileController() {
  const viewModel = useProfileViewModel();

  const onNotifications = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications.');
  }, []);

  const onEditProfile = useCallback(() => {
    Alert.alert('Edit profile', 'Profile editor coming soon.');
  }, []);

  const onCurrencyPress = useCallback(() => {
    Alert.alert('Currency', 'Currency picker coming soon.');
  }, []);

  const onBudgetPress = useCallback(() => {
    Alert.alert('Monthly budget', 'Budget editor coming soon.');
  }, []);

  const onAccountsPress = useCallback(() => {
    Alert.alert('Accounts', 'Connected accounts coming soon.');
  }, []);

  const onCategoriesPress = useCallback(() => {
    Alert.alert('Categories', 'Category manager coming soon.');
  }, []);

  const onPlanBillingPress = useCallback(() => {
    Alert.alert('Plan & billing', 'Billing details coming soon.');
  }, []);

  const onSecurityPress = useCallback(() => {
    Alert.alert('Security', 'Security settings coming soon.');
  }, []);

  const onDataPrivacyPress = useCallback(() => {
    Alert.alert('Data & privacy', 'Privacy controls coming soon.');
  }, []);

  const onHelpPress = useCallback(() => {
    Alert.alert('Help center', 'Help center coming soon.');
  }, []);

  const toggleNotifications = useCallback((enabled: boolean) => {
    profileService.setNotificationsEnabled(enabled);
  }, []);

  const onSignOut = useCallback(() => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Signed out', 'Sign-out flow coming soon.');
        },
      },
    ]);
  }, []);

  return {
    ...viewModel,
    onNotifications,
    onEditProfile,
    onCurrencyPress,
    onBudgetPress,
    onAccountsPress,
    onCategoriesPress,
    onPlanBillingPress,
    toggleNotifications,
    onSecurityPress,
    onDataPrivacyPress,
    onHelpPress,
    onSignOut,
  };
}
