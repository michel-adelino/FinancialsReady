import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BottomTabInset, FontFamily } from '@/core/theme';
import { BudgetMonthPill } from '@/features/budget/presentation/components/budget-month-pill';
import { BudgetWarningCard } from '@/features/budget/presentation/components/budget-warning-card';
import { BudgetsOverviewCard } from '@/features/budget/presentation/components/budgets-overview-card';
import { CategoryBudgetsSection } from '@/features/budget/presentation/components/category-budgets-section';
import { CreateBudgetsCta } from '@/features/budget/presentation/components/create-budgets-cta';
import { useBudgetsController } from '@/features/budget/presentation/controllers/use-budgets-controller';
import { AppHeader } from '@/features/shared/presentation/components/app-header';

export function BudgetsScreen() {
  const vm = useBudgetsController();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader
        dateLabel={vm.brandDateLabel}
        hasUnread={vm.hasUnreadNotifications}
        onNotificationsPress={vm.onNotifications}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeading}>
          <View style={styles.titleCopy}>
            <Text style={styles.title}>Budgets</Text>
            <Text style={styles.subtitle}>Plan your monthly spending limits</Text>
          </View>
          <BudgetMonthPill label={vm.monthPillLabel} onPress={vm.onMonthPress} />
        </View>

        <BudgetsOverviewCard
          periodTitle={vm.periodTitle}
          spentLabel={vm.spentLabel}
          plannedLabel={vm.plannedLabel}
          usedPercentLabel={vm.usedPercentLabel}
          usedProgress={vm.usedProgress}
          remainingLabel={vm.remainingLabel}
          dailyAllowanceLabel={vm.dailyAllowanceLabel}
        />

        {vm.warning ? (
          <BudgetWarningCard
            title={vm.warning.title}
            percentLabel={vm.warning.percentLabel}
            message={vm.warning.message}
          />
        ) : null}

        <CategoryBudgetsSection
          activeCountLabel={vm.activeCountLabel}
          categories={vm.categories}
          onCategoryPress={vm.onCategoryPress}
        />

        <CreateBudgetsCta onPress={vm.onCreatePress} />
      </ScrollView>
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
    paddingTop: 4,
    paddingBottom: BottomTabInset + 16,
    gap: 12,
  },
  pageHeading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 40,
  },
  titleCopy: {
    gap: 2,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: 22,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: AppColors.textMuted,
  },
});
