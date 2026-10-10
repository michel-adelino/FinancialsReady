import { Check } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors } from '@/constants/theme';
import { FontFamily } from '@/presentation/theme/typography';

type SaveFooterProps = {
  label: string;
  summary: string;
  disabled?: boolean;
  onPress: () => void;
};

export function SaveFooter({ label, summary, disabled, onPress }: SaveFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, disabled && styles.buttonDisabled]}>
        <Check size={16} color={AppColors.white} strokeWidth={2.4} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: AppColors.surface,
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 6,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: AppColors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.white,
  },
  summary: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
    textAlign: 'center',
  },
});
