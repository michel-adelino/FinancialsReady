import type { ProfileRepository } from '@/features/profile/data/repositories/profile-repository';
import type { ProfileSnapshot } from '@/features/profile/domain/entities/profile-snapshot';

/** Application-facing API for profile reads/writes via ProfileRepository. */
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  subscribe(listener: () => void): () => void {
    return this.profileRepository.subscribe(listener);
  }

  getVersion(): number {
    return this.profileRepository.getVersion();
  }

  getProfileSync(): ProfileSnapshot {
    return this.profileRepository.getProfileSync();
  }

  setNotificationsEnabled(enabled: boolean) {
    this.profileRepository.setNotificationsEnabled(enabled);
  }
}
