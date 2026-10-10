import type { AddTransactionInput, Transaction } from '../entities/transaction';
import type { TransactionRepository } from '../repositories/transaction-repository';

export class AddTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(input: AddTransactionInput): Promise<Transaction> {
    if (input.amountCents <= 0) {
      return Promise.reject(new Error('Amount must be greater than zero.'));
    }
    if (!input.merchant.trim()) {
      return Promise.reject(new Error('Payee is required.'));
    }
    return this.transactionRepository.addTransaction(input);
  }
}
