import { useMemo, useState } from 'react';

import { formatMoneyFromCents } from '@/core/utils/format-money';
import type {
  ActivityFilterKey,
  ActivityIconKey,
  ActivityItem,
} from '@/features/activity/domain/entities/activity-snapshot';
import { activityService } from '@/features/shared/di';

export type ActivityRowUi = {
  id: string;
  kind: ActivityItem['kind'];
  title: string;
  meta: string;
  timeLabel: string;
  amountLabel: string | null;
  isIncome: boolean;
  isAlert: boolean;
  statusLabel: string | null;
  statusTone: 'muted' | 'alert' | 'income';
  iconKey: ActivityIconKey;
};

export type ActivitySectionUi = {
  key: string;
  title: string;
  sideLabel: string;
  items: ActivityRowUi[];
};

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function sectionLabels(date: Date, reference: Date): { title: string; sideLabel: string } {
  const target = startOfDay(date);
  const today = startOfDay(reference);
  const diffDays = Math.round(
    (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  );

  const monthDay = `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}`;

  if (diffDays === 0) {
    return { title: 'Today', sideLabel: monthDay };
  }
  if (diffDays === 1) {
    return { title: 'Yesterday', sideLabel: WEEKDAYS[date.getDay()] };
  }

  return {
    title: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    sideLabel: WEEKDAYS[date.getDay()],
  };
}

function matchesFilter(item: ActivityItem, filter: ActivityFilterKey): boolean {
  if (filter === 'all') return true;
  if (filter === 'expenses') {
    return item.kind === 'transaction' && item.type === 'expense';
  }
  if (filter === 'income') {
    return item.kind === 'transaction' && item.type === 'income';
  }
  return item.kind === 'account_update' || item.kind === 'budget_alert';
}

function toRowUi(item: ActivityItem): ActivityRowUi {
  if (item.kind === 'transaction') {
    const signedCents = item.type === 'income' ? item.amountCents : -item.amountCents;
    return {
      id: item.id,
      kind: item.kind,
      title: item.merchant,
      meta: `${item.type === 'income' ? 'Income' : 'Expense'} · ${item.category}`,
      timeLabel: formatTime(item.occurredAt),
      amountLabel: formatMoneyFromCents(signedCents, true),
      isIncome: item.type === 'income',
      isAlert: false,
      statusLabel: item.statusLabel ?? null,
      statusTone: item.type === 'income' ? 'income' : 'muted',
      iconKey: item.iconKey,
    };
  }

  if (item.kind === 'account_update') {
    return {
      id: item.id,
      kind: item.kind,
      title: item.title,
      meta: item.subtitle,
      timeLabel: formatTime(item.occurredAt),
      amountLabel:
        item.amountCents != null
          ? formatMoneyFromCents(item.amountCents, true)
          : null,
      isIncome: true,
      isAlert: false,
      statusLabel: item.statusLabel,
      statusTone: 'muted',
      iconKey: item.iconKey,
    };
  }

  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    meta: item.subtitle,
    timeLabel: formatTime(item.occurredAt),
    amountLabel: `${item.usedPercent}%`,
    isIncome: false,
    isAlert: true,
    statusLabel: 'Used',
    statusTone: 'alert',
    iconKey: item.iconKey,
  };
}

function groupSections(
  items: ActivityItem[],
  reference: Date
): ActivitySectionUi[] {
  const sorted = [...items].sort(
    (a, b) => b.occurredAt.getTime() - a.occurredAt.getTime()
  );
  const groups = new Map<string, ActivitySectionUi>();

  for (const item of sorted) {
    const dayKey = startOfDay(item.occurredAt).toISOString();
    const existing = groups.get(dayKey);
    const row = toRowUi(item);
    if (existing) {
      existing.items.push(row);
      continue;
    }
    const labels = sectionLabels(item.occurredAt, reference);
    groups.set(dayKey, {
      key: dayKey,
      title: labels.title,
      sideLabel: labels.sideLabel,
      items: [row],
    });
  }

  return [...groups.values()];
}

/** Maps Activity domain data into screen-ready UI state. */
export function useActivityViewModel() {
  const snapshot = useMemo(() => activityService.getSnapshot(), []);
  const [filter, setFilter] = useState<ActivityFilterKey>('all');
  const [monthPillLabel, setMonthPillLabel] = useState(snapshot.monthPillLabel);
  const [periodTitle, setPeriodTitle] = useState(snapshot.periodTitle);
  const [accountFilterLabel, setAccountFilterLabel] = useState(
    snapshot.accountFilterLabel
  );

  const sections = useMemo(() => {
    const filtered = snapshot.items.filter((item) => matchesFilter(item, filter));
    return groupSections(filtered, snapshot.referenceDate);
  }, [filter, snapshot.items, snapshot.referenceDate]);

  return {
    brandDateLabel: snapshot.brandDateLabel,
    hasUnreadNotifications: snapshot.hasUnreadNotifications,
    monthPillLabel,
    setMonthPillLabel,
    periodTitle,
    setPeriodTitle,
    accountFilterLabel,
    setAccountFilterLabel,
    incomeLabel: formatMoneyFromCents(snapshot.incomeCents, true),
    expenseLabel: formatMoneyFromCents(-snapshot.expenseCents, true),
    filter,
    setFilter,
    sections,
  };
}
