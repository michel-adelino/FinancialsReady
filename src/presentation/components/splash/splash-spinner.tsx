import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

import { AppColors } from '@/constants/theme';

type SplashSpinnerProps = {
  size?: number;
};

/**
 * Indeterminate arc spinner (Figma). Forces motion even when OS
 * "Reduce motion" is on — otherwise Reanimated skips the loop.
 */
export function SplashSpinner({ size = 24 }: SplashSpinnerProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(
      withTiming(1, {
        duration: 850,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.Never,
      }),
      -1,
      false,
      undefined,
      ReduceMotion.Never
    );
    return () => {
      cancelAnimation(progress);
    };
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 360}deg` }],
  }));

  return (
    <Animated.View
      collapsable={false}
      style={[styles.wrap, { width: size, height: size }, animatedStyle]}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
          cx="12"
          cy="12"
          r="11"
          stroke={AppColors.splashAccent}
          strokeOpacity={0.15}
          strokeWidth={2}
        />
        <Path
          d="M12 1C13.4445 1 14.8749 1.28452 16.2095 1.83733C17.5441 2.39013 18.7567 3.20038 19.7782 4.22183C20.7996 5.24327 21.6099 6.4559 22.1627 7.79048C22.7155 9.12507 23 10.5555 23 12"
          stroke={AppColors.splashAccent}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
