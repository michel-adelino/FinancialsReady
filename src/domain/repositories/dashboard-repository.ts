import type { DashboardSnapshot, YearMonth } from '../entities/dashboard-snapshot';

export interface DashboardRepository {
  getDashboard(yearMonth: YearMonth): Promise<DashboardSnapshot>;
}

/** Optional sync capability (mock / local datasource). */
export interface SyncDashboardRepository extends DashboardRepository {
  getDashboardSync(yearMonth: YearMonth): DashboardSnapshot;
}

export function isSyncDashboardRepository(
  repo: DashboardRepository
): repo is SyncDashboardRepository {
  return (
    'getDashboardSync' in repo &&
    typeof (repo as SyncDashboardRepository).getDashboardSync === 'function'
  );
}
