import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { AppColors } from '@/constants/theme';

type SplashMarkProps = {
  size?: number;
  pulse?: boolean;
};

const motion = { reduceMotion: ReduceMotion.Never } as const;

/** Vector mark from Figma — no square plate, just ring + $ + check. */
function MarkGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
      {/* Coin ring */}
      <Path
        d="M188.493 122.496C188.493 158.945 158.945 188.493 122.496 188.493C86.047 188.493 56.4992 158.945 56.4992 122.496C56.4992 86.047 86.047 56.4992 122.496 56.4992C158.945 56.4992 188.493 86.047 188.493 122.496Z"
        stroke={AppColors.splashAccent}
        strokeWidth={11}
      />
      {/* Dollar */}
      <Path
        d="M143.998 97.0007C137.498 91.0018 129.998 89.5021 122.498 89.5021C109.997 89.5021 100.997 96.0009 100.997 105.499C100.997 115.497 110.997 119.996 122.498 122.496C135.498 125.495 144.998 129.995 144.998 139.993C144.998 149.491 135.498 155.49 122.998 155.49C112.997 155.49 104.497 152.49 97.9968 145.992"
        stroke={AppColors.splashForeground}
        strokeWidth={11}
        strokeLinecap="round"
      />
      <Path
        d="M122.499 80V164.992"
        stroke={AppColors.splashForeground}
        strokeWidth={11}
        strokeLinecap="round"
      />
      {/* Punch-out so the check sits cleanly on the ring (matches splash bg) */}
      <Path
        d="M175.002 208.998C193.778 208.998 208.998 193.778 208.998 175.002C208.998 156.226 193.778 141.005 175.002 141.005C156.226 141.005 141.005 156.226 141.005 175.002C141.005 193.778 156.226 208.998 175.002 208.998Z"
        fill={AppColors.splashBg}
      />
      <Path
        d="M156.493 174.503L169.997 188.006L196.506 160"
        stroke={AppColors.splashAccent}
        strokeWidth={12}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SplashMark({ size = 160, pulse = true }: SplashMarkProps) {
  const enter = useSharedValue(0);
  const breath = useSharedValue(1);

  useEffect(() => {
    enter.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
      ...motion,
    });

    if (!pulse) return;

    breath.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(1.03, {
            duration: 1200,
            easing: Easing.inOut(Easing.sin),
            ...motion,
          }),
          withTiming(1, {
            duration: 1200,
            easing: Easing.inOut(Easing.sin),
            ...motion,
          })
        ),
        -1,
        false,
        undefined,
        ReduceMotion.Never
      ),
      ReduceMotion.Never
    );
  }, [breath, enter, pulse]);

  const markStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [{ scale: (enter.value * 0.9 + 0.1) * breath.value }],
  }));

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Animated.View style={markStyle}>
        <MarkGlyph size={size} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
