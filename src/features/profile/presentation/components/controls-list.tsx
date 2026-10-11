import {
  Bell,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Database,
  ShieldCheck,
} from 'lucide-react-native';
import type { ComponentType, ReactNode } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type ControlRowProps = {
  label: string;
  subtitle: string;
  icon: LucideIcon;
  onPress?: () => void;
  trailing?: ReactNode;
  showDivider?: boolean;
};

function ControlRow({
  label,
  subtitle,
  icon: Icon,
  onPress,
  trailing,
  showDivider = true,
}: ControlRowProps) {
  const content = (
    <>
      <View style={[styles.iconWrap, { backgroundColor: AppColors.softSurface }]}>
        <Icon size={15} color={AppColors.accent} strokeWidth={1.8} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {trailing}
    </>
  );

  return (
    <View style={styles.rowWrap}>
      {onPress ? (
        <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
          {content}
        </Pressable>
      ) : (
        <View style={styles.row}>{content}</View>
      )}
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

type ControlsListProps = {
  planBillingSubtitle: string;
  notificationsEnabled: boolean;
  onPlanBillingPress: () => void;
  onNotificationsChange: (enabled: boolean) => void;
  onSecurityPress: () => void;
  onDataPrivacyPress: () => void;
  onHelpPress: () => void;
};

export function ControlsList({
  planBillingSubtitle,
  notificationsEnabled,
  onPlanBillingPress,
  onNotificationsChange,
  onSecurityPress,
  onDataPrivacyPress,
  onHelpPress,
}: ControlsListProps) {
  return (
    <View style={styles.card}>
      <ControlRow
        label="Plan & billing"
        subtitle={planBillingSubtitle}
        icon={CreditCard}
        onPress={onPlanBillingPress}
        trailing={<ChevronRight size={14} color={AppColors.textMuted} strokeWidth={2.2} />}
      />
      <ControlRow
        label="Notifications"
        subtitle="Budgets, bills and weekly summaries"
        icon={Bell}
        trailing={
          <Switch
            value={notificationsEnabled}
            onValueChange={onNotificationsChange}
            trackColor={{ false: AppColors.barMuted, true: AppColors.accent }}
            thumbColor={AppColors.white}
          />
        }
      />
      <ControlRow
        label="Security"
        subtitle="Face ID, passcode and sign-in history"
        icon={ShieldCheck}
        onPress={onSecurityPress}
        trailing={<ChevronRight size={14} color={AppColors.textMuted} strokeWidth={2.2} />}
      />
      <ControlRow
        label="Data & privacy"
        subtitle="Export, permissions and delete account"
        icon={Database}
        onPress={onDataPrivacyPress}
        trailing={<ChevronRight size={14} color={AppColors.textMuted} strokeWidth={2.2} />}
      />
      <ControlRow
        label="Help center"
        subtitle="Guides, FAQs and contact support"
        icon={CircleHelp}
        onPress={onHelpPress}
        trailing={<ChevronRight size={14} color={AppColors.textMuted} strokeWidth={2.2} />}
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
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  rowWrap: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 62,
    paddingVertical: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
  },
});
