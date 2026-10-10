import {
  ACCOUNT_OPTIONS,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYEE_SUGGESTIONS_EXPENSE,
  PAYEE_SUGGESTIONS_INCOME,
} from '@/features/shared/data/datasources/finance-store';
import type {
  AddTransactionInput,
  Transaction,
  TransactionType,
} from '@/features/shared/domain/entities/transaction';
import type { TransactionRepository } from '@/features/shared/domain/repositories/transaction-repository';
import type { AddTransactionUseCase } from '@/features/add-transaction/domain/usecases/add-transaction-use-case';

export type AccountOption = (typeof ACCOUNT_OPTIONS)[number];

/** Application-facing API for transaction writes and form option catalogs. */
export class TransactionService {
  constructor(
    private readonly addTransactionUseCase: AddTransactionUseCase,
    private readonly transactionRepository: TransactionRepository
  ) {}

  addTransaction(input: AddTransactionInput): Promise<Transaction> {
    return this.addTransactionUseCase.execute(input);
  }

  getById(id: string): Transaction | null {
    return this.transactionRepository.getTransactionById(id);
  }

  getAccounts(): readonly AccountOption[] {
    return ACCOUNT_OPTIONS;
  }

  getDefaultAccount(): AccountOption {
    return ACCOUNT_OPTIONS[0];
  }

  getCategories(type: TransactionType): readonly string[] {
    return type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  }

  getPayeeSuggestions(type: TransactionType): readonly string[] {
    return type === 'expense' ? PAYEE_SUGGESTIONS_EXPENSE : PAYEE_SUGGESTIONS_INCOME;
  }

  findAccount(label: string): AccountOption {
    return ACCOUNT_OPTIONS.find((account) => account.label === label) ?? ACCOUNT_OPTIONS[0];
  }
}
