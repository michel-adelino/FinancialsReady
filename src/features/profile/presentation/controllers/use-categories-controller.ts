import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useCategoriesViewModel } from '@/features/profile/presentation/viewmodels/use-categories-view-model';
import { categoriesService } from '@/features/shared/di';

export function useCategoriesController() {
  const router = useRouter();
  const viewModel = useCategoriesViewModel();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const onReorder = useCallback(() => {
    Alert.alert('Reorder', 'Category reordering coming soon.');
  }, []);

  const onEditCategory = useCallback((name: string) => {
    Alert.alert(name, 'Category editor coming soon.');
  }, []);

  const onAddCategory = useCallback(() => {
    Alert.alert(
      viewModel.addButtonLabel,
      'Add category flow coming soon.'
    );
  }, [viewModel.addButtonLabel]);

  const toggleSmartSuggestions = useCallback((enabled: boolean) => {
    categoriesService.setSmartSuggestionsEnabled(enabled);
  }, []);

  return {
    ...viewModel,
    goBack,
    onReorder,
    onEditCategory,
    onAddCategory,
    toggleSmartSuggestions,
  };
}
