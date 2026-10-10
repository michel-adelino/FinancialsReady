import { useCallback } from 'react';
import { Alert } from 'react-native';

import type { InsightsPeriodKey } from '@/features/insights/domain/entities/insights-snapshot';
import { useInsightsViewModel } from '@/features/insights/presentation/viewmodels/use-insights-view-model';

/** Handles Insights user intents on top of ViewModel state. */
export function useInsightsController() {
  const viewModel = useInsightsViewModel();
  const { setSelectedPeriod } = viewModel;

  const onNotifications = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications.');
  }, []);

  const onComparisonPress = useCallback(() => {
    Alert.alert('Comparison', 'Comparison period picker coming soon.');
  }, []);

  const onSelectPeriod = useCallback(
    (period: InsightsPeriodKey) => {
      if (period !== '1M') {
        Alert.alert('Period', `${period} insights coming soon.`);
        return;
      }
      setSelectedPeriod(period);
    },
    [setSelectedPeriod]
  );

  return {
    ...viewModel,
    onNotifications,
    onComparisonPress,
    onSelectPeriod,
  };
}
