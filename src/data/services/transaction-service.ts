import {
  ACCOUNT_OPTIONS,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYEE_SUGGESTIONS_EXPENSE,
  PAYEE_SUGGESTIONS_INCOME,
} from '@/data/datasources/finance-store';
import type {
  AddTransactionInput,
  Transaction,
  TransactionType,
} from '@/domain/entities/transaction';
import type { AddTransactionUseCase } from '@/domain/usecases/add-transaction-use-case';

export type AccountOption = (typeof ACCOUNT_OPTIONS)[number];

/** Application-facing API for transaction writes and form option catalogs. */
export class TransactionService {
  constructor(private readonly addTransactionUseCase: AddTransactionUseCase) {}

  addTransaction(input: AddTransactionInput): Promise<Transaction> {
    return this.addTransactionUseCase.execute(input);
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
