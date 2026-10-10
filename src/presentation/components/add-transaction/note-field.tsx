import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';
import { FontFamily } from '@/presentation/theme/typography';

type NoteFieldProps = {
  value: string;
  countLabel: string;
  maxLength: number;
  onChangeText: (text: string) => void;
};

export function NoteField({
  value,
  countLabel,
  maxLength,
  onChangeText,
}: NoteFieldProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Note</Text>
        <Text style={styles.count}>{countLabel}</Text>
      </View>
      <View style={styles.field}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          placeholder="Add a note"
          placeholderTextColor={AppColors.textMuted}
          style={styles.input}
        />
        <Text style={styles.helper}>Optional · Only visible to you</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: AppColors.text,
  },
  count: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
  field: {
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: Radius.md,
    padding: 12,
    gap: 6,
    minHeight: 72,
  },
  input: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: AppColors.text,
    padding: 0,
  },
  helper: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: AppColors.textMuted,
  },
});
