import type { AddBudgetInput, Budget } from '@/features/budget/domain/entities/budget';

/** Contract for budget persistence (in-memory mock today). */
export interface BudgetRepository {
  subscribe(listener: () => void): () => void;
  getVersion(): number;
  getBudgetsSync(): Budget[];
  addBudget(input: AddBudgetInput): Budget;
}
