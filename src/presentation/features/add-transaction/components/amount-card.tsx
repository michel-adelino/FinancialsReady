import { ChevronDown } from 'lucide-react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppColors, Radius , FontFamily } from '@/core/theme';

type AmountCardProps = {
  label: string;
  displayAmount: string;
  isFocused: boolean;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function AmountCard({
  label,
  displayAmount,
  isFocused,
  onChangeText,
  onFocus,
  onBlur,
}: AmountCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.ambient} />

      <View style={styles.heading}>
        <Text style={styles.label}>{label}</Text>
        {isFocused ? (
          <View style={styles.editingPill}>
            <View style={styles.editingDot} />
            <Text style={styles.editingText}>Editing</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          value={displayAmount === '0' && !isFocused ? '' : displayAmount}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor="rgba(255,255,255,0.45)"
          style={styles.amountInput}
          selectionColor={AppColors.splashAccent}
        />
      </View>

      <View style={styles.helperRow}>
        <Text style={styles.hint}>Tap amount to edit</Text>
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
    overflow: 'hidden',
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  ambient: {
    position: 'absolute',
    right: -34,
    top: -58,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.06)',
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
  editingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppColors.balanceIconBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  editingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.changeTint,
  },
  editingText: {
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
