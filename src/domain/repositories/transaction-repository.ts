import type { AddTransactionInput, Transaction } from '../entities/transaction';

export interface TransactionRepository {
  addTransaction(input: AddTransactionInput): Promise<Transaction>;
}
