import {
  Banknote,
  CreditCard,
  Landmark,
  PiggyBank,
} from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { AccountType } from '@/features/profile/domain/entities/account';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const OPTIONS: {
  type: AccountType;
  label: string;
  icon: LucideIcon;
  accentColor: string;
}[] = [
  { type: 'bank', label: 'Bank', icon: Landmark, accentColor: AppColors.accent },
  { type: 'cash', label: 'Cash', icon: Banknote, accentColor: AppColors.textSecondary },
  { type: 'credit', label: 'Credit', icon: CreditCard, accentColor: AppColors.categoryDining },
  { type: 'savings', label: 'Savings', icon: PiggyBank, accentColor: AppColors.income },
];

type AccountTypePickerProps = {
  value: AccountType;
  onChange: (type: AccountType) => void;
};

export function AccountTypePicker({ value, onChange }: AccountTypePickerProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Account type</Text>
        <Text style={styles.hint}>Choose one</Text>
      </View>
      <View style={styles.grid}>
        {OPTIONS.map((option) => {
          const selected = option.type === value;
          const Icon = option.icon;
          return (
            <Pressable
              key={option.type}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onChange(option.type)}
              style={[styles.tile, selected && styles.tileSelected]}>
              <Icon
                size={20}
                color={selected ? AppColors.white : option.accentColor}
                strokeWidth={1.8}
              />
              <Text style={[styles.tileLabel, selected && styles.tileLabelSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  hint: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  tile: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 88,
    borderRadius: Radius.lg,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tileSelected: {
    backgroundColor: AppColors.balanceCard,
    borderColor: AppColors.balanceCard,
  },
  tileLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: AppColors.text,
  },
  tileLabelSelected: {
    color: AppColors.white,
  },
});
