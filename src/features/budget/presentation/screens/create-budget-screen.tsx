import { ChevronLeft } from 'lucide-react-native';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { AmountCard } from '@/features/add-transaction/presentation/components/amount-card';
import { SaveFooter } from '@/features/add-transaction/presentation/components/save-footer';
import { AlertSummaryCard } from '@/features/budget/presentation/components/alert-summary-card';
import { BudgetDetailRows } from '@/features/budget/presentation/components/budget-detail-rows';
import { SpendingAlertSection } from '@/features/budget/presentation/components/spending-alert-section';
import { useCreateBudgetController } from '@/features/budget/presentation/controllers/use-create-budget-controller';

export function CreateBudgetScreen() {
  const vm = useCreateBudgetController();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={vm.cancel}
            style={styles.backButton}>
            <ChevronLeft size={17} color={AppColors.text} strokeWidth={2.2} />
          </Pressable>
          <View style={styles.titleCopy}>
            <Text style={styles.title}>Create budget</Text>
            <Text style={styles.subtitle}>Plan a new spending limit</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={vm.cancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <AmountCard
            label="BUDGET AMOUNT"
            displayAmount={vm.displayAmount}
            isFocused={vm.isAmountFocused}
            onChangeText={vm.onChangeAmountText}
            onFocus={() => vm.setIsAmountFocused(true)}
            onBlur={() => vm.setIsAmountFocused(false)}
            statusBadge={vm.statusBadge}
          />

          <BudgetDetailRows
            categoryName={vm.categoryName}
            periodLabel={vm.periodLabel}
            resetsLabel={vm.resetsLabel}
            onCategoryPress={vm.pickCategory}
            onPeriodPress={vm.pickPeriod}
            onResetsPress={vm.pickResets}
          />

          <SpendingAlertSection
            alertEnabled={vm.alertEnabled}
            onAlertChange={vm.setAlertEnabled}
            thresholdPillLabel={vm.thresholdPillLabel}
            onThresholdPress={vm.pickThreshold}
          />

          {vm.alertEnabled ? (
            <AlertSummaryCard title={vm.alertSummaryTitle} body={vm.alertSummaryBody} />
          ) : null}
        </ScrollView>

        <SaveFooter
          label="Save budget"
          summary={vm.summaryLine}
          disabled={vm.isSaving}
          onPress={vm.save}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  flex: {
    flex: 1,
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
    fontFamily: FontFamily.regular,
    fontSize: 18,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.textMuted,
  },
  cancel: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: AppColors.accent,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 24,
    gap: 12,
  },
});
