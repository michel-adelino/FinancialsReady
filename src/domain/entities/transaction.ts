export type TransactionType = 'income' | 'expense';

export type TransactionIconKey =
  | 'shopping-bag'
  | 'briefcase-business'
  | 'coffee';

export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  occurredAt: Date;
  /** Signed amount in cents (positive = income, negative = expense). */
  amountCents: number;
  iconKey: TransactionIconKey;
  type: TransactionType;
};
