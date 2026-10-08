import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { DefaultTheme, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import AppTabs from '@/components/app-tabs';
import { AppColors } from '@/constants/theme';

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

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={AppTheme}>
      <StatusBar style="dark" />
      <AppTabs />
    </ThemeProvider>
  );
}
