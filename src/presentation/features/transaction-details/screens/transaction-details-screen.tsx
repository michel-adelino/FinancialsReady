import { ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { BudgetProgressCard } from '@/presentation/features/transaction-details/components/budget-progress-card';
import { DetailsFooter } from '@/presentation/features/transaction-details/components/details-footer';
import { HeroCard } from '@/presentation/features/transaction-details/components/hero-card';
import { InfoRows } from '@/presentation/features/transaction-details/components/info-rows';
import { NoteCard } from '@/presentation/features/transaction-details/components/note-card';
import { RecordCard } from '@/presentation/features/transaction-details/components/record-card';
import { useTransactionDetailsController } from '@/presentation/features/transaction-details/controllers/use-transaction-details-controller';

export function TransactionDetailsScreen() {
  const vm = useTransactionDetailsController();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={vm.back}
          style={styles.backButton}>
          <ChevronLeft size={17} color={AppColors.text} strokeWidth={2.2} />
        </Pressable>
        <View style={styles.titleCopy}>
          <Text style={styles.title}>Transaction details</Text>
          <Text style={styles.subtitle}>{vm.headerSubtitle}</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={vm.onEdit} hitSlop={8}>
          <Text style={styles.edit}>Edit</Text>
        </Pressable>
      </View>

      {!vm.found ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Transaction not found</Text>
          <Text style={styles.emptyBody}>This record may have been removed.</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <HeroCard
            statusLabel={vm.statusLabel}
            cleared={vm.cleared}
            merchant={vm.merchant}
            categorySubtitle={vm.categorySubtitle}
            amountLabel={vm.amountLabel}
            accountLabel={vm.accountLabel}
            currencyCode={vm.currencyCode}
            whenLabel={vm.whenLabel}
            iconKey={vm.iconKey}
          />

          <InfoRows
            category={vm.category}
            paymentMethodLabel={vm.paymentMethodLabel}
            paymentMethodKind={vm.paymentMethodKind}
            dateTimeLabel={vm.dateTimeLabel}
          />

          {vm.hasNote ? <NoteCard note={vm.note} footer={vm.noteFooter} /> : null}

          <RecordCard
            recordIdLabel={vm.recordIdLabel}
            savedMetaLabel={vm.savedMetaLabel}
            syncLabel={vm.syncLabel}
          />

          {vm.showBudgetCard ? (
            <BudgetProgressCard
              title={vm.budgetTitle}
              spentLabel={vm.budgetSpentLabel}
              percentLabel={vm.budgetPercentLabel}
              progress={vm.budgetProgress}
            />
          ) : null}

          <DetailsFooter
            deleteHint={vm.deleteHint}
            editButtonLabel={vm.editButtonLabel}
            onDelete={vm.onDelete}
            onEdit={vm.onEdit}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    gap: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  titleCopy: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  edit: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.accent,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 14,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 6,
  },
  emptyTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: AppColors.text,
  },
  emptyBody: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: AppColors.textMuted,
    textAlign: 'center',
  },
});
