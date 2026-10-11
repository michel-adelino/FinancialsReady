import { MOCK_CATEGORIES_SNAPSHOT } from '@/features/profile/data/datasources/mock-categories-data';
import type {
  CategoriesSnapshot,
  Category,
  CategoryKind,
} from '@/features/profile/domain/entities/category';

/** Mutable in-memory categories state seeded from the design mock. */
export class CategoriesService {
  private categories: Category[] = MOCK_CATEGORIES_SNAPSHOT.categories.map((c) => ({
    ...c,
  }));
  private smartSuggestionsEnabled = MOCK_CATEGORIES_SNAPSHOT.smartSuggestionsEnabled;
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

  getSnapshotSync(): CategoriesSnapshot {
    return {
      categories: this.categories.map((category) => ({ ...category })),
      smartSuggestionsEnabled: this.smartSuggestionsEnabled,
    };
  }

  getCategoryCount(): number {
    return this.categories.length;
  }

  getCountByKind(kind: CategoryKind): number {
    return this.categories.filter((category) => category.kind === kind).length;
  }

  setSmartSuggestionsEnabled(enabled: boolean) {
    if (this.smartSuggestionsEnabled === enabled) return;
    this.smartSuggestionsEnabled = enabled;
    this.notify();
  }
}
