import { ChevronLeft, LayoutGrid, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { CategoriesInfoBanner } from '@/features/profile/presentation/components/categories/categories-info-banner';
import { CategoriesList } from '@/features/profile/presentation/components/categories/categories-list';
import { CategorySearchBar } from '@/features/profile/presentation/components/categories/category-search-bar';
import { CategoryTypeSegment } from '@/features/profile/presentation/components/categories/category-type-segment';
import { SmartSuggestionsCard } from '@/features/profile/presentation/components/categories/smart-suggestions-card';
import { useCategoriesController } from '@/features/profile/presentation/controllers/use-categories-controller';

export function CategoriesScreen() {
  const vm = useCategoriesController();

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
          <Text style={styles.title}>Categories</Text>
          <Text style={styles.subtitle}>{vm.activeCountLabel}</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={vm.onReorder} style={styles.reorder}>
          <LayoutGrid size={13} color={AppColors.accent} strokeWidth={2} />
          <Text style={styles.reorderText}>Reorder</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <CategoryTypeSegment
          value={vm.kind}
          expenseLabel={vm.expenseCountLabel}
          incomeLabel={vm.incomeCountLabel}
          onChange={vm.setKind}
        />

        <CategorySearchBar
          value={vm.searchQuery}
          countLabel={vm.filteredCountLabel}
          onChangeText={vm.setSearchQuery}
        />

        <CategoriesInfoBanner />

        <CategoriesList
          title={vm.listTitle}
          categories={vm.categories}
          onEditCategory={vm.onEditCategory}
        />

        <SmartSuggestionsCard
          enabled={vm.smartSuggestionsEnabled}
          onValueChange={vm.toggleSmartSuggestions}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={vm.onAddCategory}
          style={styles.addButton}>
          <Plus size={16} color={AppColors.white} strokeWidth={2.4} />
          <Text style={styles.addLabel}>{vm.addButtonLabel}</Text>
        </Pressable>
        <Text style={styles.footerHint}>Choose an icon, name and budget behavior</Text>
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
  reorder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reorderText: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.accent,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 16,
    gap: 12,
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
