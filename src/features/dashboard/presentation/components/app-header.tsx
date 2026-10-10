import { Image } from 'expo-image';
import { Bell } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius , FontFamily } from '@/core/theme';

type AppHeaderProps = {
  dateLabel: string;
  hasUnread: boolean;
  onNotificationsPress: () => void;
};

export function AppHeader({
  dateLabel,
  hasUnread,
  onNotificationsPress,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          contentFit="cover"
        />
        <View style={styles.brandCopy}>
          <Text style={styles.name}>Financials Ready</Text>
          <Text style={styles.date}>{dateLabel}</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        onPress={onNotificationsPress}
        style={styles.bellButton}>
        <Bell size={18} color={AppColors.text} strokeWidth={1.8} />
        {hasUnread ? <View style={styles.badge} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 58,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  brandCopy: {
    gap: 1,
  },
  name: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: AppColors.text,
  },
  date: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: AppColors.textMuted,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: AppColors.notification,
  },
});
