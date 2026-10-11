import {
  BriefcaseBusiness,
  Coffee,
  Landmark,
  ShoppingBag,
  Store,
  TriangleAlert,
} from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import type { ActivityIconKey } from '@/features/activity/domain/entities/activity-snapshot';
import type { ActivityRowUi } from '@/features/activity/presentation/viewmodels/use-activity-view-model';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const ICON_MAP: Record<ActivityIconKey, LucideIcon> = {
  'shopping-bag': ShoppingBag,
  'briefcase-business': BriefcaseBusiness,
  coffee: Coffee,
  store: Store,
  landmark: Landmark,
  'triangle-alert': TriangleAlert,
};

type ActivityListItemProps = {
  item: ActivityRowUi;
  showDivider?: boolean;
  onPress: () => void;
};

export function ActivityListItem({
  item,
  showDivider = true,
  onPress,
}: ActivityListItemProps) {
  const Icon = ICON_MAP[item.iconKey] ?? ShoppingBag;
  const isAlert = item.isAlert;
  const iconBg = isAlert
    ? AppColors.tipBackground
    : item.iconKey === 'landmark'
      ? AppColors.budgetBadgeBg
      : AppColors.softSurface;
  const iconColor = isAlert ? AppColors.categoryDining : AppColors.accent;

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${item.title}, ${item.amountLabel ?? ''}`}
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Icon size={16} color={iconColor} strokeWidth={1.8} />
        </View>

        <View style={styles.copy}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {item.meta}
          </Text>
          <Text style={styles.time}>{item.timeLabel}</Text>
        </View>

        <View style={styles.trailing}>
          {item.amountLabel ? (
            <Text
              style={[
                styles.amount,
                item.isIncome && !isAlert && styles.amountIncome,
                isAlert && styles.amountAlert,
              ]}>
              {item.amountLabel}
            </Text>
          ) : null}
          {item.statusLabel ? (
            <Text
              style={[
                styles.status,
                item.statusTone === 'alert' && styles.statusAlert,
              ]}>
              {item.statusLabel}
            </Text>
          ) : null}
        </View>
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  rowPressed: {
    opacity: 0.72,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  time: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: AppColors.textMuted,
  },
  trailing: {
    alignItems: 'flex-end',
    gap: 2,
    minWidth: 72,
  },
  amount: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  amountIncome: {
    color: AppColors.income,
  },
  amountAlert: {
    color: AppColors.categoryDining,
  },
  status: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.textMuted,
  },
  statusAlert: {
    color: AppColors.categoryDining,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
  },
});
