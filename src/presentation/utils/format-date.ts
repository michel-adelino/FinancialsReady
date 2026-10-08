const MONTH_SHORT = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const;

const MONTH_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export function formatMonthShort(month: number): string {
  return MONTH_SHORT[month - 1] ?? '';
}

export function formatMonthYear(year: number, month: number): string {
  const name = MONTH_LONG[month - 1] ?? '';
  return `${name} ${year}`;
}

export function formatTransactionWhen(
  date: Date,
  reference: Date = new Date()
): string {
  const startOfToday = new Date(
    reference.getFullYear(),
    reference.getMonth(),
    reference.getDate()
  );
  const startOfTarget = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfTarget.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) {
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `Today, ${time}`;
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
