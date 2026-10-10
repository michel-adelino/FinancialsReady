import { FileText } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type RecordCardProps = {
  recordIdLabel: string;
  savedMetaLabel: string;
  syncLabel: string;
};

export function RecordCard({
  recordIdLabel,
  savedMetaLabel,
  syncLabel,
}: RecordCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <FileText size={15} color={AppColors.textMuted} strokeWidth={1.9} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>RECORD INFORMATION</Text>
          <Text style={styles.id}>{recordIdLabel}</Text>
          <Text style={styles.meta}>{savedMetaLabel}</Text>
        </View>
        <View style={styles.syncPill}>
          <View style={styles.syncDot} />
          <Text style={styles.syncText}>{syncLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 14,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    backgroundColor: AppColors.softSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 9,
    color: AppColors.textMuted,
    letterSpacing: 0.3,
  },
  id: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  syncPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppColors.budgetBadgeBg,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.accent,
  },
  syncText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: AppColors.accent,
  },
});
