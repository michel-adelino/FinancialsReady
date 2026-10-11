import { Search } from 'lucide-react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type CategorySearchBarProps = {
  value: string;
  countLabel: string;
  onChangeText: (text: string) => void;
};

export function CategorySearchBar({
  value,
  countLabel,
  onChangeText,
}: CategorySearchBarProps) {
  return (
    <View style={styles.bar}>
      <Search size={16} color={AppColors.textMuted} strokeWidth={1.9} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search categories"
        placeholderTextColor={AppColors.textMuted}
        style={styles.input}
      />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{countLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 44,
    paddingHorizontal: 12,
    backgroundColor: AppColors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: AppColors.text,
    padding: 0,
  },
  badge: {
    minWidth: 28,
    height: 24,
    borderRadius: Radius.pill,
    backgroundColor: AppColors.softSurface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: AppColors.textSecondary,
  },
});
