import { Eye, EyeOff } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type AccountsSummaryCardProps = {
  totalLabel: string;
  cashSavingsLabel: string;
  creditBalanceLabel: string;
  syncedLabel: string;
  isBalanceHidden: boolean;
  onToggleVisibility: () => void;
};

export function AccountsSummaryCard({
  totalLabel,
  cashSavingsLabel,
  creditBalanceLabel,
  syncedLabel,
  isBalanceHidden,
  onToggleVisibility,
}: AccountsSummaryCardProps) {
  const EyeIcon = isBalanceHidden ? EyeOff : Eye;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>TOTAL ACROSS ACCOUNTS</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isBalanceHidden ? 'Show balances' : 'Hide balances'}
            onPress={onToggleVisibility}
            hitSlop={8}>
            <EyeIcon size={14} color={AppColors.balanceMuted} strokeWidth={1.9} />
          </Pressable>
        </View>
        <View style={styles.syncPill}>
          <View style={styles.syncDot} />
          <Text style={styles.syncText}>{syncedLabel}</Text>
        </View>
      </View>

      <Text style={styles.total}>{totalLabel}</Text>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Cash & savings</Text>
          <Text style={styles.metricValue}>{cashSavingsLabel}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Credit balance</Text>
          <Text style={[styles.metricValue, styles.creditValue]}>{creditBalanceLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.balanceCard,
    borderRadius: 22,
    padding: 16,
    gap: 10,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.balanceLabel,
  },
  syncPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppColors.balanceIconBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.splashAccent,
  },
  syncText: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.changeTint,
  },
  total: {
    fontFamily: FontFamily.regular,
    fontSize: 34,
    lineHeight: 40,
    color: AppColors.white,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.balanceDivider,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metric: {
    flex: 1,
    gap: 2,
  },
  metricLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.balanceMuted,
  },
  metricValue: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: AppColors.white,
  },
  creditValue: {
    color: '#F0B4A8',
  },
});
