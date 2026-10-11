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
import { NoteField } from '@/features/add-transaction/presentation/components/note-field';
import { SaveFooter } from '@/features/add-transaction/presentation/components/save-footer';
import { AccountTypePicker } from '@/features/profile/presentation/components/accounts/account-type-picker';
import { AddAccountDetailRows } from '@/features/profile/presentation/components/accounts/add-account-detail-rows';
import { OpeningBalanceCard } from '@/features/profile/presentation/components/accounts/opening-balance-card';
import { ReadyStatusBanner } from '@/features/profile/presentation/components/accounts/ready-status-banner';
import { useAddAccountController } from '@/features/profile/presentation/controllers/use-add-account-controller';

export function AddAccountScreen() {
  const vm = useAddAccountController();

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
            <Text style={styles.title}>Add account</Text>
            <Text style={styles.subtitle}>Add a financial source</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={vm.cancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <AccountTypePicker value={vm.type} onChange={vm.setType} />

          <OpeningBalanceCard
            displayAmount={vm.displayAmount}
            isFocused={vm.isAmountFocused}
            onChangeText={vm.onChangeAmountText}
            onFocus={() => vm.setIsAmountFocused(true)}
            onBlur={() => vm.setIsAmountFocused(false)}
          />

          <AddAccountDetailRows
            name={vm.name}
            onChangeName={vm.onChangeName}
            currencyLabel={vm.currencyLabel}
            onCurrencyPress={vm.pickCurrency}
            institution={vm.institution}
            onInstitutionPress={vm.pickInstitution}
          />

          <NoteField
            value={vm.note}
            countLabel={vm.noteCountLabel}
            maxLength={vm.noteMax}
            onChangeText={vm.onChangeNote}
          />

          <ReadyStatusBanner />
        </ScrollView>

        <SaveFooter
          label="Save account"
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
    gap: 12,
  },
});
