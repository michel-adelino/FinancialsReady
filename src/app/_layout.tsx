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
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { AppColors } from '@/constants/theme';
import { SplashSequence } from '@/presentation/components/splash/splash-sequence';

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
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!(fontsLoaded || fontError)) return;
    SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={AppTheme}>
      <StatusBar style={showSplash ? 'light' : 'dark'} />
      <View style={styles.root}>
        <AppTabs />
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
