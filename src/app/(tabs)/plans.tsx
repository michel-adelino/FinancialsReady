import { type Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, FontFamily, Radius } from '@/core/theme';

export default function PlansScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Plans</Text>
        <Text style={styles.subtitle}>Set spending limits for your categories</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/create-budget' as Href)}
          style={styles.cta}>
          <Text style={styles.ctaLabel}>Create budget</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: AppColors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
  cta: {
    backgroundColor: AppColors.accent,
    borderRadius: Radius.md,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  ctaLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.white,
  },
});
