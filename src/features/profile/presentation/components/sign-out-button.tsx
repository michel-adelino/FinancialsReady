import { LogOut } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type SignOutButtonProps = {
  onPress: () => void;
};

export function SignOutButton({ onPress }: SignOutButtonProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
      <LogOut size={16} color={AppColors.categoryDining} strokeWidth={2} />
      <Text style={styles.label}>Sign out</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48,
    borderRadius: Radius.lg,
    backgroundColor: AppColors.tipBackground,
    borderWidth: 1,
    borderColor: AppColors.tipBorder,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: AppColors.categoryDining,
  },
});
