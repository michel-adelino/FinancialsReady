const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatMoneyFromCents(cents: number, signed = false): string {
  const absolute = Math.abs(cents) / 100;
  const formatted = currencyFormatter.format(absolute);
  if (!signed) {
    return formatted;
  }
  if (cents > 0) {
    return `+${formatted}`;
  }
  if (cents < 0) {
    return `−${formatted}`;
  }
  return formatted;
}

export function maskMoney(): string {
  return '••••••';
}
