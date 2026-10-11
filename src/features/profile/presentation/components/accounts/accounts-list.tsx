import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { AccountRow } from '@/features/profile/presentation/components/accounts/account-row';
import type { AccountRowUi } from '@/features/profile/presentation/viewmodels/use-accounts-view-model';

type AccountsListProps = {
  accounts: AccountRowUi[];
  activeCountLabel: string;
  onAccountPress: (name: string) => void;
};

export function AccountsList({
  accounts,
  activeCountLabel,
  onAccountPress,
}: AccountsListProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Accounts</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{activeCountLabel}</Text>
        </View>
      </View>

      <View style={styles.card}>
        {accounts.map((account, index) => (
          <AccountRow
            key={account.id}
            name={account.name}
            subtitle={account.subtitle}
            balanceLabel={account.balanceLabel}
            statusLabel={account.statusLabel}
            isCredit={account.isCredit}
            type={account.type}
            onPress={() => onAccountPress(account.name)}
            showDivider={index < accounts.length - 1}
          />
        ))}
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
    fontSize: 16,
    color: AppColors.text,
  },
  pill: {
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pillText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.accent,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
});
