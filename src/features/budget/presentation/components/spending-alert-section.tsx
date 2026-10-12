import { Bell, ChevronDown } from 'lucide-react-native';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type SpendingAlertSectionProps = {
  alertEnabled: boolean;
  onAlertChange: (enabled: boolean) => void;
  thresholdPillLabel: string;
  onThresholdPress: () => void;
};

export function SpendingAlertSection({
  alertEnabled,
  onAlertChange,
  thresholdPillLabel,
  onThresholdPress,
}: SpendingAlertSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Spending alert</Text>
        <Text style={styles.optional}>Optional</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.toggleRow}>
          <View style={styles.iconWrap}>
            <Bell size={15} color={AppColors.accent} strokeWidth={1.8} />
          </View>
          <View style={styles.copy}>
            <Text style={styles.toggleTitle}>Alert me before I reach the limit</Text>
            <Text style={styles.toggleSubtitle}>Helpful for staying on track</Text>
          </View>
          <Switch
            value={alertEnabled}
            onValueChange={onAlertChange}
            trackColor={{ false: AppColors.barMuted, true: AppColors.accent }}
            thumbColor={AppColors.white}
          />
        </View>

        {alertEnabled ? (
          <>
            <View style={styles.divider} />
            <View style={styles.thresholdRow}>
              <View style={styles.copy}>
                <Text style={styles.thresholdLabel}>ALERT THRESHOLD</Text>
                <Text style={styles.thresholdValue}>
                  When {thresholdPillLabel} is spent
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={onThresholdPress}
                style={styles.pill}>
                <Text style={styles.pillText}>{thresholdPillLabel}</Text>
                <ChevronDown size={12} color={AppColors.accent} strokeWidth={2.2} />
              </Pressable>
            </View>
          </>
        ) : null}
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
  optional: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 64,
    paddingVertical: 8,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: AppColors.budgetBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  toggleTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  toggleSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.border,
  },
  thresholdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 58,
    paddingVertical: 8,
  },
  thresholdLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  thresholdValue: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: AppColors.text,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.accent,
  },
});
