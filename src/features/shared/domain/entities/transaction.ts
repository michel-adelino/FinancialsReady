export type TransactionType = 'income' | 'expense';

export type TransactionIconKey =
  | 'shopping-bag'
  | 'briefcase-business'
  | 'coffee'
  | 'store';

export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  occurredAt: Date;
  amountCents: number;
  iconKey: TransactionIconKey;
  type: TransactionType;
  note?: string;
  accountLabel?: string;
  cleared?: boolean;
};

export type AddTransactionInput = {
  type: TransactionType;
  amountCents: number;
  merchant: string;
  category: string;
  accountLabel: string;
  occurredAt: Date;
  note: string;
  cleared: boolean;
};
