import { Pencil } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontFamily, Radius } from '@/core/theme';

type ProfileHeroCardProps = {
  initials: string;
  fullName: string;
  email: string;
  planBadgeLabel: string;
  onEditPress: () => void;
};

export function ProfileHeroCard({
  initials,
  fullName,
  email,
  planBadgeLabel,
  onEditPress,
}: ProfileHeroCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View style={styles.copy}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{email}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.dot} />
            <Text style={styles.badge}>{planBadgeLabel}</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit profile"
          onPress={onEditPress}
          style={styles.editButton}>
          <Pencil size={14} color={AppColors.white} strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.balanceCard,
    borderRadius: 22,
    padding: 16,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AppColors.budgetBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: AppColors.accent,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 17,
    color: AppColors.white,
  },
  email: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: AppColors.balanceMuted,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.splashAccent,
  },
  badge: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.changeTint,
  },
  editButton: {
    width: 34,
    height: 34,
    borderRadius: Radius.pill,
    backgroundColor: AppColors.balanceIconBg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
