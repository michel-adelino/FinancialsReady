import { Pressable, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors, FontFamily } from '@/core/theme';
import { moderateScale, scale, verticalScale } from '@/core/utils/screen';
import { useFadeRise } from '@/features/transaction-success/presentation/hooks/use-fade-rise';

const ACTION_BORDER = '#C9D8D0';

type SuccessActionsProps = {
  onDone: () => void;
  onAddAnother: () => void;
};

export function SuccessActions({ onDone, onAddAnother }: SuccessActionsProps) {
  const insets = useSafeAreaInsets();
  const rise = useFadeRise(1020, 320, verticalScale(8));
  const radius = scale(14);

  return (
    <Animated.View
      style={[
        styles.footer,
        {
          paddingHorizontal: scale(20),
          paddingTop: verticalScale(12),
          paddingBottom: Math.max(insets.bottom, verticalScale(20)),
          gap: verticalScale(12),
        },
        rise,
      ]}>
      <Pressable
        accessibilityRole="button"
        onPress={onDone}
        style={({ pressed }) => [
          styles.done,
          { height: verticalScale(50), borderRadius: radius },
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.doneLabel, { fontSize: moderateScale(13) }]}>Done</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={onAddAnother}
        style={({ pressed }) => [
          styles.another,
          { height: verticalScale(48), borderRadius: radius },
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.anotherLabel, { fontSize: moderateScale(13) }]}>Add another</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
  },
  done: {
    backgroundColor: AppColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneLabel: {
    fontFamily: FontFamily.bold,
    color: AppColors.white,
  },
  another: {
    borderWidth: 1,
    borderColor: ACTION_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anotherLabel: {
    fontFamily: FontFamily.semibold,
    color: AppColors.accent,
  },
  pressed: {
    opacity: 0.82,
  },
});
