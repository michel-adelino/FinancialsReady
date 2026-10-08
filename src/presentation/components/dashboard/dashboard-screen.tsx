import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BottomTabInset } from '@/constants/theme';
import { AppHeader } from '@/presentation/components/dashboard/app-header';
import { BalanceCard } from '@/presentation/components/dashboard/balance-card';
import { SpendingOverviewCard } from '@/presentation/components/dashboard/spending-overview-card';
import { TransactionList } from '@/presentation/components/dashboard/transaction-list';
import { WelcomeSection } from '@/presentation/components/dashboard/welcome-section';
import { FontFamily } from '@/presentation/theme/typography';
import { useDashboardViewModel } from '@/presentation/viewmodels/use-dashboard-view-model';

export function DashboardScreen() {
  const vm = useDashboardViewModel();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader
        dateLabel={vm.brandDateLabel}
        hasUnread={vm.hasUnreadNotifications}
        onNotificationsPress={vm.onNotifications}
      />

      {vm.isLoading && !vm.greeting ? (
        <View style={styles.loading}>
          <ActivityIndicator color={AppColors.accent} />
        </View>
      ) : vm.error ? (
        <View style={styles.loading}>
          <Text style={styles.errorText}>{vm.error}</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <WelcomeSection
            greeting={vm.greeting}
            subtitle={vm.subtitle}
            monthShort={vm.monthShort}
            onMonthPress={vm.selectMonth}
          />

          <BalanceCard
            totalLabel={vm.totalBalanceLabel}
            changePercentLabel={vm.changePercentLabel}
            incomeLabel={vm.incomeLabel}
            spendingLabel={vm.spendingLabel}
            isBalanceHidden={vm.isBalanceHidden}
            onToggleVisibility={vm.toggleBalanceVisibility}
            onAddExpense={vm.onAddExpense}
            onAddIncome={vm.onAddIncome}
          />

          <SpendingOverviewCard
            periodLabel={vm.spendingPeriodLabel}
            totalLabel={vm.spendingTotalLabel}
            averageLabel={vm.spendingAverageLabel}
            budgetUsedLabel={vm.budgetUsedLabel}
            dailyBars={vm.dailyBars}
            categories={vm.categories}
            onPeriodPress={vm.selectSpendingPeriod}
          />

          <TransactionList
            transactions={vm.transactions}
            onViewAll={vm.onViewAllTransactions}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 7,
    paddingBottom: BottomTabInset + 16,
    gap: 13,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: AppColors.textSecondary,
  },
});
