import { ChevronDown } from 'lucide-react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type OpeningBalanceCardProps = {
  displayAmount: string;
  isFocused: boolean;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function OpeningBalanceCard({
  displayAmount,
  isFocused,
  onChangeText,
  onFocus,
  onBlur,
}: OpeningBalanceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.label}>OPENING BALANCE</Text>
        <View style={styles.optionalPill}>
          <View style={styles.optionalDot} />
          <Text style={styles.optionalText}>Optional</Text>
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          value={displayAmount === '0' && !isFocused ? '' : displayAmount}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="rgba(255,255,255,0.45)"
          style={styles.amountInput}
          selectionColor={AppColors.splashAccent}
        />
      </View>

      <View style={styles.helperRow}>
        <Text style={styles.hint}>Enter today’s balance</Text>
        <View style={styles.currencyChip}>
          <Text style={styles.currencyCode}>USD</Text>
          <ChevronDown size={11} color={AppColors.white} strokeWidth={2.2} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.balanceCard,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: AppColors.accent,
    padding: 14,
    gap: 8,
    minHeight: 140,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.balanceLabel,
  },
  optionalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppColors.balanceIconBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  optionalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.splashAccent,
  },
  optionalText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: AppColors.changeTint,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 42,
  },
  currencySymbol: {
    fontFamily: FontFamily.medium,
    fontSize: 24,
    color: 'rgba(255,255,255,0.72)',
  },
  amountInput: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 38,
    lineHeight: 42,
    color: AppColors.white,
    padding: 0,
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hint: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: AppColors.balanceMuted,
  },
  currencyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currencyCode: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.white,
  },
});
