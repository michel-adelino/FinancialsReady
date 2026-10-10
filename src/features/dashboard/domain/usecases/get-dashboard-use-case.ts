import type { DashboardSnapshot, YearMonth } from '../entities/dashboard-snapshot';
import {
  isSyncDashboardRepository,
  type DashboardRepository,
} from '../repositories/dashboard-repository';

export class GetDashboardUseCase {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  execute(yearMonth: YearMonth): Promise<DashboardSnapshot> {
    return this.dashboardRepository.getDashboard(yearMonth);
  }

  /** Sync path when the repository supports in-memory reads. */
  executeSync(yearMonth: YearMonth): DashboardSnapshot {
    if (!isSyncDashboardRepository(this.dashboardRepository)) {
      throw new Error('Sync dashboard requires a SyncDashboardRepository.');
    }
    return this.dashboardRepository.getDashboardSync(yearMonth);
  }
}
