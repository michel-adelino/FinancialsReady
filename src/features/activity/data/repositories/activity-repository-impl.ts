import { MOCK_ACTIVITY } from '@/features/activity/data/datasources/mock-activity-data';
import type { ActivityRepository } from '@/features/activity/data/repositories/activity-repository';
import type { ActivitySnapshot } from '@/features/activity/domain/entities/activity-snapshot';

export class ActivityRepositoryImpl implements ActivityRepository {
  private readonly snapshot: ActivitySnapshot = {
    ...MOCK_ACTIVITY,
    yearMonth: { ...MOCK_ACTIVITY.yearMonth },
    referenceDate: new Date(MOCK_ACTIVITY.referenceDate),
    items: MOCK_ACTIVITY.items.map((item) => ({
      ...item,
      occurredAt: new Date(item.occurredAt),
    })),
  };

  getSnapshot(): ActivitySnapshot {
    return {
      ...this.snapshot,
      yearMonth: { ...this.snapshot.yearMonth },
      referenceDate: new Date(this.snapshot.referenceDate),
      items: this.snapshot.items.map((item) => ({
        ...item,
        occurredAt: new Date(item.occurredAt),
      })),
    };
  }
}
