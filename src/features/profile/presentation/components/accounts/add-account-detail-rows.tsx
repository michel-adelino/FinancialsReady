import { ChevronRight, DollarSign, Landmark } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type AddAccountDetailRowsProps = {
  name: string;
  onChangeName: (text: string) => void;
  currencyLabel: string;
  onCurrencyPress: () => void;
  institution: string;
  onInstitutionPress: () => void;
};

export function AddAccountDetailRows({
  name,
  onChangeName,
  currencyLabel,
  onCurrencyPress,
  institution,
  onInstitutionPress,
}: AddAccountDetailRowsProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <IconBubble icon={Landmark} />
        <View style={styles.copy}>
          <Text style={styles.label}>ACCOUNT NAME</Text>
          <TextInput
            value={name}
            onChangeText={onChangeName}
            placeholder="Account name"
            placeholderTextColor={AppColors.textMuted}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.divider} />

      <Pressable accessibilityRole="button" onPress={onCurrencyPress} style={styles.row}>
        <IconBubble icon={DollarSign} />
        <View style={styles.copy}>
          <Text style={styles.label}>CURRENCY</Text>
          <Text style={styles.value}>{currencyLabel}</Text>
        </View>
        <Text style={styles.trailing}>Default</Text>
        <ChevronRight size={13} color={AppColors.textMuted} strokeWidth={2.2} />
      </Pressable>
      <View style={styles.divider} />

      <Pressable accessibilityRole="button" onPress={onInstitutionPress} style={styles.row}>
        <IconBubble icon={Landmark} />
        <View style={styles.copy}>
          <Text style={styles.label}>INSTITUTION</Text>
          <Text style={[styles.value, !institution && styles.valueMuted]} numberOfLines={1}>
            {institution || 'Add bank or institution'}
          </Text>
        </View>
        <ChevronRight size={13} color={AppColors.textMuted} strokeWidth={2.2} />
      </Pressable>
    </View>
  );
}

function IconBubble({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <View style={styles.iconWrap}>
      <Icon size={15} color={AppColors.accent} strokeWidth={1.8} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.border,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 58,
    paddingVertical: 8,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.budgetBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  value: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  valueMuted: {
    color: AppColors.textMuted,
  },
  input: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
    padding: 0,
  },
  trailing: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.accent,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
  },
});
