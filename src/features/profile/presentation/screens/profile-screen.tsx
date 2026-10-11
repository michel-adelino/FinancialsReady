import { DollarSign, Gauge, Landmark, Tags } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BottomTabInset, FontFamily } from '@/core/theme';
import { ControlsList } from '@/features/profile/presentation/components/controls-list';
import {
  PreferenceGrid,
  PreferenceTile,
} from '@/features/profile/presentation/components/preference-tile';
import { ProfileHeroCard } from '@/features/profile/presentation/components/profile-hero-card';
import { SignOutButton } from '@/features/profile/presentation/components/sign-out-button';
import { useProfileController } from '@/features/profile/presentation/controllers/use-profile-controller';
import { AppHeader } from '@/features/shared/presentation/components/app-header';

export function ProfileScreen() {
  const vm = useProfileController();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader
        dateLabel={vm.brandDateLabel}
        hasUnread={vm.hasUnreadNotifications}
        onNotificationsPress={vm.onNotifications}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeading}>
          <Text style={styles.title}>Profile & settings</Text>
          <Text style={styles.subtitle}>
            Your identity, preferences and account controls.
          </Text>
        </View>

        <ProfileHeroCard
          initials={vm.initials}
          fullName={vm.fullName}
          email={vm.email}
          planBadgeLabel={vm.planBadgeLabel}
          onEditPress={vm.onEditProfile}
        />

        <Text style={styles.sectionLabel}>FINANCIAL PREFERENCES</Text>
        <PreferenceGrid>
          <PreferenceTile
            title={vm.currencyCode}
            subtitle={vm.currencyName}
            icon={DollarSign}
            iconBg={AppColors.budgetBadgeBg}
            onPress={vm.onCurrencyPress}
          />
          <PreferenceTile
            title={vm.budgetAmountLabel}
            subtitle={vm.budgetUsedLabel}
            subtitleTone="accent"
            icon={Gauge}
            iconBg={AppColors.tipBackground}
            iconColor={AppColors.categoryDining}
            onPress={vm.onBudgetPress}
          />
        </PreferenceGrid>

        <Text style={styles.sectionLabel}>ORGANIZE</Text>
        <PreferenceGrid>
          <PreferenceTile
            title="Accounts"
            subtitle={vm.accountsSubtitle}
            icon={Landmark}
            iconBg={AppColors.budgetBadgeBg}
            onPress={vm.onAccountsPress}
          />
          <PreferenceTile
            title="Categories"
            subtitle={vm.categoriesSubtitle}
            icon={Tags}
            iconBg={AppColors.budgetBadgeBg}
            onPress={vm.onCategoriesPress}
          />
        </PreferenceGrid>

        <Text style={styles.sectionLabel}>CONTROLS & SUPPORT</Text>
        <ControlsList
          planBillingSubtitle={vm.planBillingSubtitle}
          notificationsEnabled={vm.notificationsEnabled}
          onPlanBillingPress={vm.onPlanBillingPress}
          onNotificationsChange={vm.toggleNotifications}
          onSecurityPress={vm.onSecurityPress}
          onDataPrivacyPress={vm.onDataPrivacyPress}
          onHelpPress={vm.onHelpPress}
        />

        <SignOutButton onPress={vm.onSignOut} />
        <Text style={styles.version}>{vm.versionLabel}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: BottomTabInset + 24,
    gap: 12,
  },
  pageHeading: {
    gap: 4,
    marginBottom: 4,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    color: AppColors.text,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: AppColors.textMuted,
    lineHeight: 18,
  },
  sectionLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.textMuted,
    marginTop: 8,
    letterSpacing: 0.4,
  },
  version: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});
