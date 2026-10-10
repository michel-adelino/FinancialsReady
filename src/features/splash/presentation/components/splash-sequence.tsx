import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { AppColors, FontFamily } from '@/core/theme';
import { SplashMark } from '@/features/splash/presentation/components/splash-mark';
import { SplashSpinner } from '@/features/splash/presentation/components/splash-spinner';

const PART1_MS = 1200;
const PART2_MS = 2200;
const EXIT_MS = 420;

const FIGMA_H = 844;
const MARK_TOP = 342;
const COPY_TOP = 526;
const SPINNER_TOP = 704;

type SplashPhase = 'part1' | 'part2' | 'exiting';

type SplashSequenceProps = {
  onFinish: () => void;
};

export function SplashSequence({ onFinish }: SplashSequenceProps) {
  const { height } = useWindowDimensions();
  const [phase, setPhase] = useState<SplashPhase>('part1');
  const overlayOpacity = useSharedValue(1);
  const markLift = useSharedValue(0);

  const scaleY = height / FIGMA_H;

  useEffect(() => {
    const toPart2 = setTimeout(() => setPhase('part2'), PART1_MS);
    return () => clearTimeout(toPart2);
  }, []);

  useEffect(() => {
    if (phase === 'part2') {
      markLift.value = withTiming(-8, {
        duration: 450,
        easing: Easing.out(Easing.cubic),
        reduceMotion: ReduceMotion.Never,
      });
    }
  }, [markLift, phase]);

  useEffect(() => {
    if (phase !== 'part2') return;

    const toExit = setTimeout(() => {
      setPhase('exiting');
      overlayOpacity.value = withDelay(
        40,
        withTiming(
          0,
          {
            duration: EXIT_MS,
            easing: Easing.in(Easing.cubic),
            reduceMotion: ReduceMotion.Never,
          },
          (finished) => {
            if (finished) {
              runOnJS(onFinish)();
            }
          }
        ),
        ReduceMotion.Never
      );
    }, PART2_MS);

    return () => clearTimeout(toExit);
  }, [onFinish, overlayOpacity, phase]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const markMotionStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: markLift.value }],
  }));

  const showBranding = phase === 'part2' || phase === 'exiting';

  return (
    <Animated.View style={[styles.root, overlayStyle]}>
      <Animated.View
        style={[styles.markSlot, { top: MARK_TOP * scaleY }, markMotionStyle]}>
        <SplashMark size={160} pulse />
      </Animated.View>

      {showBranding ? (
        <View style={[styles.brandCopy, { top: COPY_TOP * scaleY }]}>
          <Animated.Text
            entering={FadeInUp.duration(480)
              .easing(Easing.out(Easing.cubic))
              .reduceMotion(ReduceMotion.Never)}
            style={styles.title}>
            Financials Ready
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(120)
              .duration(480)
              .easing(Easing.out(Easing.cubic))
              .reduceMotion(ReduceMotion.Never)}
            style={styles.tagline}>
            Your money, in a calmer place.
          </Animated.Text>
        </View>
      ) : null}

      {showBranding ? (
        <Animated.View
          entering={FadeIn.delay(220)
            .duration(400)
            .reduceMotion(ReduceMotion.Never)}
          style={[styles.spinnerSlot, { top: SPINNER_TOP * scaleY }]}>
          <SplashSpinner size={28} />
        </Animated.View>
      ) : null}

      {showBranding ? (
        <Animated.View
          entering={FadeInDown.duration(600).reduceMotion(ReduceMotion.Never)}
          style={styles.ambient}
        />
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: AppColors.splashBg,
    zIndex: 100,
    elevation: 100,
    overflow: 'hidden',
    pointerEvents: 'auto',
  },
  markSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brandCopy: {
    position: 'absolute',
    left: 24,
    right: 24,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 28,
    lineHeight: 34,
    color: AppColors.splashForeground,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    color: AppColors.splashMuted,
    textAlign: 'center',
  },
  spinnerSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  ambient: {
    position: 'absolute',
    bottom: -80,
    left: -40,
    right: -40,
    height: 220,
    backgroundColor: 'rgba(152, 217, 186, 0.06)',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    pointerEvents: 'none',
  },
});
