import { financeStore } from '@/data/datasources/finance-store';
import type { AddTransactionInput, Transaction } from '@/domain/entities/transaction';
import type { TransactionRepository } from '@/domain/repositories/transaction-repository';

export class MockTransactionRepository implements TransactionRepository {
  async addTransaction(input: AddTransactionInput): Promise<Transaction> {
    return financeStore.addTransaction(input);
  }
}
