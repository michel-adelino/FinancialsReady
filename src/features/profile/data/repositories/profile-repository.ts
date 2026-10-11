import type { ProfileSnapshot } from '@/features/profile/domain/entities/profile-snapshot';

/** Contract for profile reads/writes */
export interface ProfileRepository {
  subscribe(listener: () => void): () => void;
  getVersion(): number;
  getProfileSync(): ProfileSnapshot;
  setNotificationsEnabled(enabled: boolean): void;
}
