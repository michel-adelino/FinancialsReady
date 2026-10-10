import { ChevronDown } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BottomTabInset, FontFamily } from '@/core/theme';
import { CategoryBreakdownCard } from '@/features/insights/presentation/components/category-breakdown-card';
import { InsightTipCard } from '@/features/insights/presentation/components/insight-tip-card';
import { NetCashFlowCard } from '@/features/insights/presentation/components/net-cash-flow-card';
import { PeriodSegment } from '@/features/insights/presentation/components/period-segment';
import { SpendingTrendCard } from '@/features/insights/presentation/components/spending-trend-card';
import { useInsightsController } from '@/features/insights/presentation/controllers/use-insights-controller';
import { AppHeader } from '@/features/shared/presentation/components/app-header';

export function InsightsScreen() {
  const vm = useInsightsController();

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
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.range}>{vm.periodRangeLabel}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={vm.onComparisonPress}
            style={styles.comparison}>
            <Text style={styles.comparisonText}>{vm.comparisonLabel}</Text>
            <ChevronDown size={10} color={AppColors.textMuted} strokeWidth={2.2} />
          </Pressable>
        </View>

        <PeriodSegment value={vm.selectedPeriod} onChange={vm.onSelectPeriod} />

        <NetCashFlowCard
          netCashFlowLabel={vm.netCashFlowLabel}
          netChangePercentLabel={vm.netChangePercentLabel}
          incomeLabel={vm.incomeLabel}
          expenseLabel={vm.expenseLabel}
        />

        <SpendingTrendCard
          spendingTotalLabel={vm.spendingTotalLabel}
          dailyAverageLabel={vm.dailyAverageLabel}
          spendingChangeLabel={vm.spendingChangeLabel}
          spendingDeltaLabel={vm.spendingDeltaLabel}
          currentSeriesLabel={vm.currentSeriesLabel}
          previousSeriesLabel={vm.previousSeriesLabel}
          weeklyBars={vm.weeklyBars}
        />

        <CategoryBreakdownCard
          categories={vm.categories}
          totalLabel={vm.categoriesTotalLabel}
        />

        <InsightTipCard
          title={vm.tipTitle}
          usedLabel={vm.tipUsedLabel}
          body={vm.tipBody}
        />
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
    gap: 8,
  },
  pageHeading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 34,
  },
  titleCopy: {
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: 20,
    color: AppColors.text,
  },
  range: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  comparison: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
  },
  comparisonText: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
});
