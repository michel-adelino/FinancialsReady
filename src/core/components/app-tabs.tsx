import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { AppColors } from '@/core/theme';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={AppColors.surface}
      indicatorColor={AppColors.softSurface}
      tintColor={AppColors.accent}
      iconColor={{
        default: AppColors.tabInactive,
        selected: AppColors.accent,
      }}
      labelStyle={{
        default: { color: AppColors.tabInactive },
        selected: { color: AppColors.accent },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="activity">
        <NativeTabs.Trigger.Label>Activity</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/activity.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/insights.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="plans">
        <NativeTabs.Trigger.Label>Plans</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/plans.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/profile.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
