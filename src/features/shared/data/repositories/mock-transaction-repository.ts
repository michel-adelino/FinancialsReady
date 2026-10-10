import { financeStore } from '@/features/shared/data/datasources/finance-store';
import type { AddTransactionInput, Transaction } from '@/features/shared/domain/entities/transaction';
import type { TransactionRepository } from '@/features/shared/domain/repositories/transaction-repository';

export class MockTransactionRepository implements TransactionRepository {
  async addTransaction(input: AddTransactionInput): Promise<Transaction> {
    return financeStore.addTransaction(input);
  }

  getTransactionById(id: string): Transaction | null {
    return financeStore.getTransactionById(id);
  }
}
