import { MOCK_PROFILE } from '@/features/profile/data/datasources/mock-profile-data';
import type { ProfileSnapshot } from '@/features/profile/domain/entities/profile-snapshot';

/** Mutable in-memory profile state seeded from the design mock. */
export class ProfileService {
  private snapshot: ProfileSnapshot = { ...MOCK_PROFILE, user: { ...MOCK_PROFILE.user } };
  private version = 0;
  private listeners = new Set<() => void>();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getVersion(): number {
    return this.version;
  }

  private notify() {
    this.version += 1;
    this.listeners.forEach((listener) => listener());
  }

  getProfileSync(): ProfileSnapshot {
    return {
      ...this.snapshot,
      user: { ...this.snapshot.user },
      yearMonth: { ...this.snapshot.yearMonth },
    };
  }

  setNotificationsEnabled(enabled: boolean) {
    if (this.snapshot.notificationsEnabled === enabled) return;
    this.snapshot = {
      ...this.snapshot,
      notificationsEnabled: enabled,
    };
    this.notify();
  }
}
