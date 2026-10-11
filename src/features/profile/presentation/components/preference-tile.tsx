import type { ComponentType, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type PreferenceTileProps = {
  title: string;
  subtitle: string;
  subtitleTone?: 'muted' | 'accent';
  icon: LucideIcon;
  iconBg: string;
  iconColor?: string;
  onPress: () => void;
};

export function PreferenceTile({
  title,
  subtitle,
  subtitleTone = 'muted',
  icon: Icon,
  iconBg,
  iconColor = AppColors.accent,
  onPress,
}: PreferenceTileProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.tile}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Icon size={16} color={iconColor} strokeWidth={1.9} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text
        style={[styles.subtitle, subtitleTone === 'accent' && styles.subtitleAccent]}
        numberOfLines={1}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

type PreferenceGridProps = {
  children: ReactNode;
};

export function PreferenceGrid({ children }: PreferenceGridProps) {
  return <View style={styles.grid}>{children}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  tile: {
    flex: 1,
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    padding: 14,
    gap: 8,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  subtitleAccent: {
    color: AppColors.accent,
  },
});
