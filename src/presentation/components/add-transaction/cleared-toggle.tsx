import { CircleCheck } from 'lucide-react-native';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { AppColors } from '@/constants/theme';
import { FontFamily } from '@/presentation/theme/typography';

type ClearedToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function ClearedToggle({ value, onValueChange }: ClearedToggleProps) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <CircleCheck size={15} color={AppColors.accent} strokeWidth={2} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>Cleared transaction</Text>
        <Text style={styles.description}>Include in your current balance</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: AppColors.border, true: AppColors.accent }}
        thumbColor={AppColors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: AppColors.budgetBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: AppColors.text,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
});
