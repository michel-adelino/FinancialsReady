import type { BudgetRepository } from '@/features/budget/data/repositories/budget-repository';
import type { AddBudgetInput, Budget } from '@/features/budget/domain/entities/budget';

/** Application-facing API for budgets. */
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  subscribe(listener: () => void): () => void {
    return this.budgetRepository.subscribe(listener);
  }

  getVersion(): number {
    return this.budgetRepository.getVersion();
  }

  getBudgetsSync(): Budget[] {
    return this.budgetRepository.getBudgetsSync();
  }

  addBudget(input: AddBudgetInput): Budget {
    return this.budgetRepository.addBudget(input);
  }
}
