import { CalendarDays, ChevronRight, RotateCcw, Utensils } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type RowProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor?: string;
  trailing?: string;
  onPress: () => void;
  showDivider?: boolean;
};

function DetailRow({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor = AppColors.accent,
  trailing,
  onPress,
  showDivider = true,
}: RowProps) {
  return (
    <View>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Icon size={15} color={iconColor} strokeWidth={1.8} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        </View>
        {trailing ? <Text style={styles.trailing}>{trailing}</Text> : null}
        <ChevronRight size={13} color={AppColors.textMuted} strokeWidth={2.2} />
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

type BudgetDetailRowsProps = {
  categoryName: string;
  periodLabel: string;
  resetsLabel: string;
  onCategoryPress: () => void;
  onPeriodPress: () => void;
  onResetsPress: () => void;
};

export function BudgetDetailRows({
  categoryName,
  periodLabel,
  resetsLabel,
  onCategoryPress,
  onPeriodPress,
  onResetsPress,
}: BudgetDetailRowsProps) {
  return (
    <View style={styles.card}>
      <DetailRow
        label="CATEGORY"
        value={categoryName}
        icon={Utensils}
        iconBg={AppColors.tipBackground}
        iconColor={AppColors.categoryDining}
        onPress={onCategoryPress}
      />
      <DetailRow
        label="PERIOD"
        value={periodLabel}
        icon={CalendarDays}
        iconBg={AppColors.budgetBadgeBg}
        trailing="Recommended"
        onPress={onPeriodPress}
      />
      <DetailRow
        label="RESETS"
        value={resetsLabel}
        icon={RotateCcw}
        iconBg={AppColors.softSurface}
        onPress={onResetsPress}
        showDivider={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    paddingHorizontal: 12,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
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
