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

import { AppColors, Radius } from '@/constants/theme';
import { AmountCard } from '@/presentation/components/add-transaction/amount-card';
import { ClearedToggle } from '@/presentation/components/add-transaction/cleared-toggle';
import { DetailRows } from '@/presentation/components/add-transaction/detail-rows';
import { NoteField } from '@/presentation/components/add-transaction/note-field';
import { SaveFooter } from '@/presentation/components/add-transaction/save-footer';
import { TypeSegment } from '@/presentation/components/add-transaction/type-segment';
import { FontFamily } from '@/presentation/theme/typography';
import { useAddTransactionViewModel } from '@/presentation/viewmodels/use-add-transaction-view-model';

export function AddTransactionScreen() {
  const vm = useAddTransactionViewModel();

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
            <Text style={styles.title}>Add transaction</Text>
            <Text style={styles.subtitle}>{vm.headerDateLabel}</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={vm.cancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <TypeSegment value={vm.type} onChange={vm.setType} />

          <AmountCard
            label={vm.amountCardLabel}
            displayAmount={vm.displayAmount}
            isFocused={vm.isAmountFocused}
            onChangeText={vm.onChangeAmountText}
            onFocus={() => vm.setIsAmountFocused(true)}
            onBlur={() => vm.setIsAmountFocused(false)}
          />

          <Text style={styles.sectionTitle}>Transaction details</Text>

          <DetailRows
            payeeLabel={vm.payeeFieldLabel}
            payeeValue={vm.payee}
            onPayeePress={vm.pickPayee}
            categoryValue={vm.category}
            categoryMuted={!vm.hasCategory}
            onCategoryPress={vm.pickCategory}
            accountValue={vm.accountLabel}
            accountAvailable={vm.accountAvailableLabel}
            onAccountPress={vm.pickAccount}
            dateValue={vm.dateFieldLabel}
            onDatePress={vm.pickDate}
          />

          <NoteField
            value={vm.note}
            countLabel={vm.noteCountLabel}
            maxLength={vm.noteMax}
            onChangeText={vm.onChangeNote}
          />

          <ClearedToggle value={vm.cleared} onValueChange={vm.setCleared} />
        </ScrollView>

        <SaveFooter
          label={vm.saveButtonLabel}
          summary={vm.summaryLine}
          disabled={vm.isSaving}
          onPress={() => {
            void vm.save();
          }}
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
    gap: 10,
  },
  sectionTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: AppColors.text,
    marginTop: 2,
  },
});
