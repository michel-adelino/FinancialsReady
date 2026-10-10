import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius , FontFamily } from '@/core/theme';
import { TransactionRow } from '@/presentation/features/dashboard/components/transaction-row';
import type { TransactionRowUi } from '@/presentation/features/dashboard/viewmodels/use-dashboard-view-model';

type TransactionListProps = {
  transactions: TransactionRowUi[];
  onViewAll: () => void;
};

export function TransactionList({ transactions, onViewAll }: TransactionListProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Recent transactions</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onViewAll}
          style={styles.viewAll}>
          <Text style={styles.viewAllText}>View all</Text>
          <ChevronRight size={11} color={AppColors.accent} strokeWidth={2.4} />
        </Pressable>
      </View>

      <View style={styles.list}>
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} transaction={tx} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 7,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: AppColors.text,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.accent,
  },
  list: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
});
