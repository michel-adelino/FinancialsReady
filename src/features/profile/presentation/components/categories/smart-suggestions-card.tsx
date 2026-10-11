import { Sparkles } from 'lucide-react-native';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type SmartSuggestionsCardProps = {
  enabled: boolean;
  onValueChange: (enabled: boolean) => void;
};

export function SmartSuggestionsCard({
  enabled,
  onValueChange,
}: SmartSuggestionsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Sparkles size={16} color={AppColors.accent} strokeWidth={1.8} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>Smart category suggestions</Text>
        <Text style={styles.body}>Suggest a category when adding new transactions</Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onValueChange}
        trackColor={{ false: AppColors.barMuted, true: AppColors.accent }}
        thumbColor={AppColors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    padding: 14,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: AppColors.budgetBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
});
