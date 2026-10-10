import { Pencil, Trash2 } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type DetailsFooterProps = {
  deleteHint: string;
  editButtonLabel: string;
  onDelete: () => void;
  onEdit: () => void;
};

export function DetailsFooter({
  deleteHint,
  editButtonLabel,
  onDelete,
  onEdit,
}: DetailsFooterProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete"
          onPress={onDelete}
          style={styles.deleteButton}>
          <Trash2 size={15} color={AppColors.notification} strokeWidth={2} />
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={editButtonLabel}
          onPress={onEdit}
          style={styles.editButton}>
          <Pencil size={15} color={AppColors.white} strokeWidth={2} />
          <Text style={styles.editText}>{editButtonLabel}</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>{deleteHint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
    paddingTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minWidth: 104,
    height: 48,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: '#F0C4BB',
    backgroundColor: AppColors.surface,
    paddingHorizontal: 14,
  },
  deleteText: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.notification,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: AppColors.balanceCard,
    paddingHorizontal: 16,
  },
  editText: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.white,
  },
  hint: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
    textAlign: 'center',
  },
});
