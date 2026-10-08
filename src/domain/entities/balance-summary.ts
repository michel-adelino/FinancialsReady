export type BalanceSummary = {
  /** Total balance in cents. */
  totalCents: number;
  changePercent: number;
  incomeCents: number;
  spendingCents: number;
};
