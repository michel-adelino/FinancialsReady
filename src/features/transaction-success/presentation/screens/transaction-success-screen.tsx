import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, FontFamily } from '@/core/theme';
import { formatMoneyFromCents } from '@/core/utils/format-money';
import {
  contentWidth,
  moderateScale,
  scale,
  useScreenMetrics,
  verticalScale,
} from '@/core/utils/screen';
import { SuccessActions } from '@/features/transaction-success/presentation/components/success-actions';
import { SuccessEmblem } from '@/features/transaction-success/presentation/components/success-emblem';
import { SavedDetailsCard } from '@/features/transaction-success/presentation/components/saved-details-card';
import { useFadeRise } from '@/features/transaction-success/presentation/hooks/use-fade-rise';
import type { TransactionType } from '@/features/shared/domain/entities/transaction';

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

function parseType(value: string): TransactionType {
  return value === 'income' ? 'income' : 'expense';
}

function parseCents(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 0;
  return Math.abs(parsed);
}

function formatSavedDate(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function TransactionSuccessScreen() {
  const router = useRouter();
  const metrics = useScreenMetrics();
  const params = useLocalSearchParams<{
    type?: string;
    amountCents?: string;
    merchant?: string;
    category?: string;
    accountLabel?: string;
    occurredAt?: string;
  }>();

  const type = parseType(firstParam(params.type));
  const amountCents = parseCents(firstParam(params.amountCents));
  const merchant = firstParam(params.merchant);
  const category = firstParam(params.category);
  const accountLabel = firstParam(params.accountLabel);
  const savedDate = formatSavedDate(firstParam(params.occurredAt));
  const signedCents = type === 'expense' ? -amountCents : amountCents;
  const amountLabel = formatMoneyFromCents(signedCents, amountCents > 0);
  const typeLabel = type === 'income' ? 'Income' : 'Expense';

  const titleStyle = useFadeRise(360, 320, verticalScale(6));
  const messageStyle = useFadeRise(430, 320, verticalScale(6));
  const amountStyle = useFadeRise(520, 320, verticalScale(16));
  const dateStyle = useFadeRise(870, 320, verticalScale(8));

  const columnWidth = contentWidth(metrics.width);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={[styles.column, { width: columnWidth }]}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: verticalScale(54),
              paddingHorizontal: scale(20),
              paddingBottom: verticalScale(24),
            },
          ]}
          showsVerticalScrollIndicator={false}>
          <SuccessEmblem />
          <Animated.Text
            style={[
              styles.title,
              { fontSize: moderateScale(24), marginTop: verticalScale(26) },
              titleStyle,
            ]}>
            Transaction saved
          </Animated.Text>
          <Animated.Text
            style={[
              styles.message,
              { fontSize: moderateScale(12), marginTop: verticalScale(8) },
              messageStyle,
            ]}>
            {type === 'income'
              ? 'Your income has been added.'
              : 'Your expense has been added.'}
          </Animated.Text>
          <Animated.View style={[{ marginTop: verticalScale(36) }, amountStyle]}>
            <Text
              style={[styles.amount, { fontSize: moderateScale(42) }]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.6}>
              {amountLabel}
            </Text>
            <Text
              style={[
                styles.currency,
                { fontSize: moderateScale(10), marginTop: verticalScale(8) },
              ]}>
              {`USD · ${typeLabel}`}
            </Text>
          </Animated.View>
          <View style={{ marginTop: verticalScale(28) }}>
            <SavedDetailsCard
              merchant={merchant}
              category={category}
              accountLabel={accountLabel}
            />
          </View>
          <Animated.Text
            style={[
              styles.date,
              { fontSize: moderateScale(10), marginTop: verticalScale(19) },
              dateStyle,
            ]}>
            {savedDate}
          </Animated.Text>
        </ScrollView>
        <SuccessActions
          onDone={() => router.back()}
          onAddAnother={() =>
            router.replace({
              pathname: '/add-transaction',
              params: { type },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
    alignItems: 'center',
  },
  column: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontFamily: FontFamily.semibold,
    color: AppColors.text,
    textAlign: 'center',
  },
  message: {
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },
  amount: {
    fontFamily: FontFamily.regular,
    color: AppColors.balanceCard,
    textAlign: 'center',
  },
  currency: {
    fontFamily: FontFamily.medium,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },
  date: {
    fontFamily: FontFamily.medium,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },
});
