import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '@/core/theme';
import { OnboardingSequence } from '@/features/onboarding/presentation/screens/onboarding-sequence';
import { onboardingService } from '@/features/shared/di';
import { SplashSequence } from '@/features/splash/presentation/components/splash-sequence';

SplashScreen.preventAutoHideAsync();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.accent,
    background: AppColors.background,
    card: AppColors.surface,
    text: AppColors.text,
    border: AppColors.border,
    notification: AppColors.notification,
  },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(
    () => !onboardingService.isCompletedSync()
  );

  useEffect(() => {
    if (!(fontsLoaded || fontError)) return;
    SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const statusBarStyle = showSplash
    ? 'light'
    : showOnboarding
      ? undefined
      : 'dark';

  return (
    <ThemeProvider value={AppTheme}>
      {statusBarStyle ? <StatusBar style={statusBarStyle} /> : null}
      <View style={styles.root}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="add-transaction"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="transaction-details"
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="accounts"
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="add-account"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="create-budget"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="categories"
            options={{
              animation: 'slide_from_right',
            }}
          />
        </Stack>
        {!showSplash && showOnboarding ? (
          <OnboardingSequence onComplete={handleOnboardingComplete} />
        ) : null}
        {showSplash ? <SplashSequence onFinish={handleSplashFinish} /> : null}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
