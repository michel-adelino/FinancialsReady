import type { ActivitySnapshot } from '@/features/activity/domain/entities/activity-snapshot';

export interface ActivityRepository {
  getSnapshot(): ActivitySnapshot;
}
