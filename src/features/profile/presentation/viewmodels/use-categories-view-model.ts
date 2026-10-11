import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

import type {
  Category,
  CategoryKind,
} from '@/features/profile/domain/entities/category';
import { categoriesService } from '@/features/shared/di';

export type CategoryRowUi = {
  id: string;
  name: string;
  metaLabel: string;
  iconKey: Category['iconKey'];
  iconBg: string;
};

export type CategoriesUiState = {
  kind: CategoryKind;
  setKind: (kind: CategoryKind) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCountLabel: string;
  expenseCountLabel: string;
  incomeCountLabel: string;
  listTitle: string;
  filteredCountLabel: string;
  categories: CategoryRowUi[];
  smartSuggestionsEnabled: boolean;
  addButtonLabel: string;
};

/** Maps categories domain data into Categories screen UI state. */
export function useCategoriesViewModel(): CategoriesUiState {
  const [kind, setKindState] = useState<CategoryKind>('expense');
  const [searchQuery, setSearchQuery] = useState('');

  const storeVersion = useSyncExternalStore(
    (onStoreChange) => categoriesService.subscribe(onStoreChange),
    () => categoriesService.getVersion(),
    () => 0
  );

  const setKind = useCallback((next: CategoryKind) => {
    setKindState(next);
  }, []);

  return useMemo(() => {
    void storeVersion;
    const snapshot = categoriesService.getSnapshotSync();
    const expenseCount = snapshot.categories.filter((c) => c.kind === 'expense').length;
    const incomeCount = snapshot.categories.filter((c) => c.kind === 'income').length;
    const query = searchQuery.trim().toLowerCase();

    const filtered = snapshot.categories.filter((category) => {
      if (category.kind !== kind) return false;
      if (!query) return true;
      return category.name.toLowerCase().includes(query);
    });

    return {
      kind,
      setKind,
      searchQuery,
      setSearchQuery,
      activeCountLabel: `${snapshot.categories.length} active classifications`,
      expenseCountLabel: `Expense • ${expenseCount}`,
      incomeCountLabel: `Income • ${incomeCount}`,
      listTitle: kind === 'expense' ? 'Expense categories' : 'Income categories',
      filteredCountLabel: String(filtered.length),
      categories: filtered.map((category) => ({
        id: category.id,
        name: category.name,
        metaLabel: category.metaLabel,
        iconKey: category.iconKey,
        iconBg: category.iconBg,
      })),
      smartSuggestionsEnabled: snapshot.smartSuggestionsEnabled,
      addButtonLabel:
        kind === 'expense' ? 'Add expense category' : 'Add income category',
    };
  }, [kind, searchQuery, setKind, storeVersion]);
}
