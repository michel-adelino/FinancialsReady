import { ChevronLeft, CircleHelp, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { AccountsList } from '@/features/profile/presentation/components/accounts/accounts-list';
import { AccountsSummaryCard } from '@/features/profile/presentation/components/accounts/accounts-summary-card';
import { DefaultAccountCard } from '@/features/profile/presentation/components/accounts/default-account-card';
import { useAccountsController } from '@/features/profile/presentation/controllers/use-accounts-controller';

export function AccountsScreen() {
  const vm = useAccountsController();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={vm.goBack}
          style={styles.backButton}>
          <ChevronLeft size={17} color={AppColors.text} strokeWidth={2.2} />
        </Pressable>
        <View style={styles.titleCopy}>
          <Text style={styles.title}>Accounts</Text>
          <Text style={styles.subtitle}>{vm.sourcesCountLabel}</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={vm.onManage}>
          <Text style={styles.manage}>Manage</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>{vm.introTitle}</Text>
          <Text style={styles.introSubtitle}>{vm.introSubtitle}</Text>
        </View>

        <AccountsSummaryCard
          totalLabel={vm.totalLabel}
          cashSavingsLabel={vm.cashSavingsLabel}
          creditBalanceLabel={vm.creditBalanceLabel}
          syncedLabel={vm.syncedLabel}
          isBalanceHidden={vm.isBalanceHidden}
          onToggleVisibility={vm.toggleBalanceVisibility}
        />

        <AccountsList
          accounts={vm.accounts}
          activeCountLabel={vm.activeCountLabel}
          onAccountPress={vm.onAccountPress}
        />

        <DefaultAccountCard
          subtitle={vm.defaultAccountSubtitle}
          onPress={vm.onDefaultAccountPress}
        />

        <Pressable accessibilityRole="button" onPress={vm.onHelpPress} style={styles.help}>
          <CircleHelp size={14} color={AppColors.textMuted} strokeWidth={1.9} />
          <Text style={styles.helpText}>How balances are calculated</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={vm.onAddAccount}
          style={styles.addButton}>
          <Plus size={16} color={AppColors.white} strokeWidth={2.4} />
          <Text style={styles.addLabel}>Add an account</Text>
        </Pressable>
        <Text style={styles.footerHint}>Securely connect a bank or add one manually.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    height: 58,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCopy: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  manage: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.accent,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 16,
    gap: 14,
  },
  intro: {
    gap: 4,
  },
  introTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    color: AppColors.text,
  },
  introSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: AppColors.textMuted,
    lineHeight: 18,
  },
  help: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  helpText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: AppColors.textMuted,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
    backgroundColor: AppColors.background,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 50,
    borderRadius: Radius.lg,
    backgroundColor: AppColors.balanceCard,
  },
  addLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: AppColors.white,
  },
  footerHint: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
    textAlign: 'center',
  },
});
