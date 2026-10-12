import { Plus } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type CreateBudgetsCtaProps = {
  onPress: () => void;
};

export function CreateBudgetsCta({ onPress }: CreateBudgetsCtaProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Plus size={16} color={AppColors.white} strokeWidth={2.4} />
      <Text style={styles.label}>Create or manage budgets</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: AppColors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.white,
  },
});
