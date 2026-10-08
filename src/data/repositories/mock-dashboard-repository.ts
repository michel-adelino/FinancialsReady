import { MOCK_DASHBOARD } from '@/data/datasources/mock-dashboard-data';
import type {
  DashboardSnapshot,
  YearMonth,
} from '@/domain/entities/dashboard-snapshot';
import type { SyncDashboardRepository } from '@/domain/repositories/dashboard-repository';

export class MockDashboardRepository implements SyncDashboardRepository {
  getDashboardSync(yearMonth: YearMonth): DashboardSnapshot {
    return {
      ...MOCK_DASHBOARD,
      yearMonth,
    };
  }

  async getDashboard(yearMonth: YearMonth): Promise<DashboardSnapshot> {
    return this.getDashboardSync(yearMonth);
  }
}
