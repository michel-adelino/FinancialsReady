import { MOCK_BUDGETS } from '@/features/budget/data/datasources/mock-budgets-data';
import type { BudgetRepository } from '@/features/budget/data/repositories/budget-repository';
import type { AddBudgetInput, Budget } from '@/features/budget/domain/entities/budget';

/** In-memory BudgetRepository. */
export class BudgetRepositoryImpl implements BudgetRepository {
  private budgets: Budget[] = MOCK_BUDGETS.map((budget) => ({ ...budget }));
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

  getBudgetsSync(): Budget[] {
    return this.budgets.map((budget) => ({ ...budget }));
  }

  addBudget(input: AddBudgetInput): Budget {
    if (input.amountCents <= 0) {
      throw new Error('Budget amount must be greater than zero.');
    }
    if (!input.categoryName.trim()) {
      throw new Error('Category is required.');
    }

    const budget: Budget = {
      id: `budget-${Date.now()}`,
      amountCents: Math.abs(input.amountCents),
      categoryId: input.categoryId,
      categoryName: input.categoryName.trim(),
      period: input.period,
      resetsLabel: input.resetsLabel,
      alertEnabled: input.alertEnabled,
      alertThresholdPercent: input.alertThresholdPercent,
      currencyCode: input.currencyCode || 'USD',
    };

    this.budgets = [budget, ...this.budgets];
    this.notify();
    return budget;
  }
}
