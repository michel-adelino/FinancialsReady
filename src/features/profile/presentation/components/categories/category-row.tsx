import {
  ArrowLeftRight,
  BriefcaseBusiness,
  Car,
  CircleEllipsis,
  Clapperboard,
  GraduationCap,
  HeartPulse,
  Home,
  Laptop,
  Pencil,
  Plane,
  PlusCircle,
  Repeat,
  RotateCcw,
  Shirt,
  ShoppingCart,
  TrendingUp,
  Utensils,
  Zap,
} from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily } from '@/core/theme';
import type { CategoryIconKey } from '@/features/profile/domain/entities/category';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const ICON_MAP: Record<CategoryIconKey, LucideIcon> = {
  utensils: Utensils,
  'shopping-cart': ShoppingCart,
  car: Car,
  shirt: Shirt,
  zap: Zap,
  'heart-pulse': HeartPulse,
  home: Home,
  clapperboard: Clapperboard,
  plane: Plane,
  'graduation-cap': GraduationCap,
  repeat: Repeat,
  'circle-ellipsis': CircleEllipsis,
  briefcase: BriefcaseBusiness,
  laptop: Laptop,
  'arrow-left-right': ArrowLeftRight,
  'trending-up': TrendingUp,
  'rotate-ccw': RotateCcw,
  'plus-circle': PlusCircle,
};

type CategoryRowProps = {
  name: string;
  metaLabel: string;
  iconKey: CategoryIconKey;
  iconBg: string;
  onEditPress: () => void;
  showDivider?: boolean;
};

export function CategoryRow({
  name,
  metaLabel,
  iconKey,
  iconBg,
  onEditPress,
  showDivider = true,
}: CategoryRowProps) {
  const Icon = ICON_MAP[iconKey] ?? CircleEllipsis;

  return (
    <View>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Icon size={16} color={AppColors.accent} strokeWidth={1.8} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {metaLabel}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Edit ${name}`}
          onPress={onEditPress}
          hitSlop={8}
          style={styles.editButton}>
          <Pencil size={14} color={AppColors.accent} strokeWidth={2} />
        </Pressable>
      </View>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 60,
    paddingVertical: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: AppColors.text,
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  editButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
    marginLeft: 46,
  },
});
