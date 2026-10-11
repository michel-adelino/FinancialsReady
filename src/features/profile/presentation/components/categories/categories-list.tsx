import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';
import { CategoryRow } from '@/features/profile/presentation/components/categories/category-row';
import type { CategoryRowUi } from '@/features/profile/presentation/viewmodels/use-categories-view-model';

type CategoriesListProps = {
  title: string;
  categories: CategoryRowUi[];
  onEditCategory: (name: string) => void;
};

export function CategoriesList({
  title,
  categories,
  onEditCategory,
}: CategoriesListProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>Tap pencil to edit.</Text>
      </View>

      <View style={styles.card}>
        {categories.length === 0 ? (
          <Text style={styles.empty}>No categories match your search.</Text>
        ) : (
          categories.map((category, index) => (
            <CategoryRow
              key={category.id}
              name={category.name}
              metaLabel={category.metaLabel}
              iconKey={category.iconKey}
              iconBg={category.iconBg}
              onEditPress={() => onEditCategory(category.name)}
              showDivider={index < categories.length - 1}
            />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: AppColors.text,
  },
  hint: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  empty: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: AppColors.textMuted,
    textAlign: 'center',
    paddingVertical: 24,
  },
});
