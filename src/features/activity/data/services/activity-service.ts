import type { ActivityRepository } from '@/features/activity/data/repositories/activity-repository';
import type { ActivitySnapshot } from '@/features/activity/domain/entities/activity-snapshot';

/** Application-facing API for Activity reads via ActivityRepository. */
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  getSnapshot(): ActivitySnapshot {
    return this.activityRepository.getSnapshot();
  }
}
