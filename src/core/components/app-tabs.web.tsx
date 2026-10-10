import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import {
  ChartNoAxesColumn,
  House,
  UserRound,
  WalletCards,
} from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, MaxContentWidth, Spacing , FontFamily } from '@/core/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/(tabs)" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="activity" href="/(tabs)/activity" asChild>
            <TabButton icon="activity">Activity</TabButton>
          </TabTrigger>
          <TabTrigger name="plans" href="/(tabs)/plans" asChild>
            <TabButton icon="plans">Plans</TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href="/(tabs)/profile" asChild>
            <TabButton icon="profile">Profile</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

type TabIconName = 'home' | 'activity' | 'plans' | 'profile';

type TabButtonProps = TabTriggerSlotProps & {
  icon: TabIconName;
};

function TabIcon({ name, color }: { name: TabIconName; color: string }) {
  const props = { size: 18, color, strokeWidth: 2 } as const;
  switch (name) {
    case 'home':
      return <House {...props} />;
    case 'activity':
      return <ChartNoAxesColumn {...props} />;
    case 'plans':
      return <WalletCards {...props} />;
    case 'profile':
      return <UserRound {...props} />;
  }
}

export function TabButton({ children, isFocused, icon, ...props }: TabButtonProps) {
  const color = isFocused ? AppColors.accent : AppColors.tabInactive;

  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.tabButtonView}>
        <TabIcon name={icon} color={color} />
        <Text
          style={[
            styles.tabLabel,
            { color, fontFamily: isFocused ? FontFamily.bold : FontFamily.medium },
          ]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.innerContainer}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    backgroundColor: AppColors.surface,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    maxWidth: MaxContentWidth,
    shadowColor: '#12251F',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    gap: 4,
    minWidth: 62,
  },
  tabLabel: {
    fontSize: 10,
  },
});
