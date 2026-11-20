import { CreditCard, ShoppingBag, Store } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { AppColors, FontFamily } from '@/core/theme';
import { moderateScale, scale, verticalScale } from '@/core/utils/screen';
import { useFadeRise } from '@/features/transaction-success/presentation/hooks/use-fade-rise';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type Detail = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

type SavedDetailsCardProps = {
  merchant: string;
  category: string;
  accountLabel: string;
};

const CATEGORY_ICON = '#C4785A';

export function SavedDetailsCard({ merchant, category, accountLabel }: SavedDetailsCardProps) {
  const rise = verticalScale(8);
  const rowStyles = [
    useFadeRise(690, 320, rise),
    useFadeRise(780, 320, rise),
    useFadeRise(870, 320, rise),
  ];

  const details: Detail[] = [
    {
      label: 'MERCHANT',
      value: merchant,
      icon: Store,
      iconBg: AppColors.softSurface,
      iconColor: AppColors.accent,
    },
    {
      label: 'CATEGORY',
      value: category,
      icon: ShoppingBag,
      iconBg: AppColors.tipBackground,
      iconColor: CATEGORY_ICON,
    },
    {
      label: 'ACCOUNT',
      value: accountLabel,
      icon: CreditCard,
      iconBg: AppColors.budgetBadgeBg,
      iconColor: AppColors.accent,
    },
  ];

  const rowHeight = verticalScale(64);
  const iconBox = scale(32);
  const iconSize = scale(15);
  const radius = scale(18);
  const iconRadius = scale(10);

  return (
    <View style={[styles.card, { borderRadius: radius }]}>
      {details.map((detail, index) => {
        const Icon = detail.icon;
        const animatedStyle = rowStyles[index];
        return (
          <Animated.View key={detail.label} style={[{ height: rowHeight }, animatedStyle]}>
            <View style={[styles.row, { paddingHorizontal: scale(14), gap: scale(12) }]}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    width: iconBox,
                    height: iconBox,
                    borderRadius: iconRadius,
                    backgroundColor: detail.iconBg,
                  },
                ]}>
                <Icon size={iconSize} color={detail.iconColor} strokeWidth={1.8} />
              </View>
              <View style={styles.copy}>
                <Text style={[styles.label, { fontSize: moderateScale(9) }]}>{detail.label}</Text>
                <Text
                  style={[styles.value, { fontSize: moderateScale(13) }]}
                  numberOfLines={1}>
                  {detail.value}
                </Text>
              </View>
            </View>
            {index < details.length - 1 ? (
              <View
                style={[
                  styles.divider,
                  { left: scale(58), right: scale(14) },
                ]}
              />
            ) : null}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: FontFamily.semibold,
    color: AppColors.textSecondary,
  },
  value: {
    fontFamily: FontFamily.semibold,
    color: AppColors.text,
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    backgroundColor: AppColors.softSurface,
  },
});
