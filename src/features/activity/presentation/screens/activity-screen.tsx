import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BottomTabInset, FontFamily, Radius } from '@/core/theme';
import { ActivityFilterChips } from '@/features/activity/presentation/components/activity-filter-chips';
import { ActivityListItem } from '@/features/activity/presentation/components/activity-list-item';
import { ActivityMonthPill } from '@/features/activity/presentation/components/activity-month-pill';
import { ActivitySectionHeader } from '@/features/activity/presentation/components/activity-section-header';
import { ActivitySummaryCard } from '@/features/activity/presentation/components/activity-summary-card';
import { useActivityController } from '@/features/activity/presentation/controllers/use-activity-controller';
import { AppHeader } from '@/features/shared/presentation/components/app-header';

export function ActivityScreen() {
  const vm = useActivityController();

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
            <Text style={styles.title}>Activity</Text>
            <Text style={styles.subtitle}>Your money, in order.</Text>
          </View>
          <ActivityMonthPill label={vm.monthPillLabel} onPress={vm.onMonthPress} />
        </View>

        <ActivityFilterChips value={vm.filter} onChange={vm.onSelectFilter} />

        <ActivitySummaryCard
          periodTitle={vm.periodTitle}
          accountFilterLabel={vm.accountFilterLabel}
          incomeLabel={vm.incomeLabel}
          expenseLabel={vm.expenseLabel}
          onAccountFilterPress={vm.onAccountFilterPress}
        />

        {vm.sections.map((section) => (
          <View key={section.key} style={styles.section}>
            <ActivitySectionHeader
              title={section.title}
              sideLabel={section.sideLabel}
            />
            <View style={styles.card}>
              {section.items.map((item, index) => (
                <ActivityListItem
                  key={item.id}
                  item={item}
                  showDivider={index < section.items.length - 1}
                  onPress={() => vm.onItemPress(item.id, item.kind)}
                />
              ))}
            </View>
          </View>
        ))}
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
  section: {
    gap: 8,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
});
