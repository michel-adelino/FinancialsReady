import { MOCK_INSIGHTS } from '@/features/insights/data/datasources/mock-insights-data';
import type { InsightsSnapshot } from '@/features/insights/domain/entities/insights-snapshot';

/** Application-facing API for Insights reads. */
export class InsightsService {
  getSnapshot(): InsightsSnapshot {
    return MOCK_INSIGHTS;
  }
}
