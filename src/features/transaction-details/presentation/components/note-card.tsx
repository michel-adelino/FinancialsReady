import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type NoteCardProps = {
  note: string;
  footer: string;
};

export function NoteCard({ note, footer }: NoteCardProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Note</Text>
        <Text style={styles.hint}>Only visible to you</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.note}>{note}</Text>
        <Text style={styles.footer}>{footer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  hint: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 4,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 2,
  },
  note: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: AppColors.text,
  },
  footer: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
});
