import { useEffect } from 'react';
import {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const easeOut = {
  easing: Easing.out(Easing.cubic),
  reduceMotion: ReduceMotion.Never,
} as const;

export function useFadeRise(delayMs: number, durationMs: number, distance: number) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delayMs,
      withTiming(1, {
        duration: durationMs,
        ...easeOut,
      })
    );
  }, [delayMs, durationMs, progress]);

  return useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: distance * (1 - progress.value) }],
  }));
}
