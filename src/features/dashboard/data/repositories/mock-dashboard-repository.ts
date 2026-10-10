import { financeStore } from '@/features/shared/data/datasources/finance-store';
import type {
  DashboardSnapshot,
  YearMonth,
} from '@/features/dashboard/domain/entities/dashboard-snapshot';
import type { SyncDashboardRepository } from '@/features/dashboard/domain/repositories/dashboard-repository';

export class MockDashboardRepository implements SyncDashboardRepository {
  getDashboardSync(yearMonth: YearMonth): DashboardSnapshot {
    const snapshot = financeStore.getSnapshot();
    return {
      ...snapshot,
      yearMonth,
    };
  }

  async getDashboard(yearMonth: YearMonth): Promise<DashboardSnapshot> {
    return this.getDashboardSync(yearMonth);
  }
}
