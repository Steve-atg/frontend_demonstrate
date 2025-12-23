export interface TransactionFormValues {
  amount: number;
  categoryIds?: string[];
  currency: string;
  description?: string;
  transactionDate: string;
  type: 'SPEND' | 'INCOME';
  userId?: string;
}
