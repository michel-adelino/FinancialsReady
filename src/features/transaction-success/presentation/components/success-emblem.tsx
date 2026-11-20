import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

import { AppColors } from '@/core/theme';
import { scale } from '@/core/utils/screen';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CIRCLE_PATH =
  'M43.255 1.25C54.3937 1.25133 65.0756 5.67724 72.9511 13.5542C80.8267 21.4311 85.2507 32.1138 85.25 43.2525C85.2493 54.3912 80.8241 65.0734 72.9476 72.9494C65.0711 80.8254 54.3887 85.25 43.25 85.25C32.1113 85.25 21.4289 80.8254 13.5524 72.9494C5.67594 65.0734 1.25066 54.3912 1.25 43.2525C1.24934 32.1138 5.67335 21.4311 13.5489 13.5542C21.4244 5.67724 32.1063 1.25133 43.245 1.25';

const CHECK_PATH = 'M37.0099 2.88L13.5456 26.345L2.88 15.6791';

const CIRCLE_LENGTH = 280;
const easeOut = {
  easing: Easing.out(Easing.cubic),
  reduceMotion: ReduceMotion.Never,
} as const;

export function SuccessEmblem() {
  const size = scale(112);
  const draw = useSharedValue(0);
  const checkScale = useSharedValue(0.6);
  const checkOpacity = useSharedValue(0);

  useEffect(() => {
    draw.value = withDelay(80, withTiming(1, { duration: 470, ...easeOut }));
    checkOpacity.value = withDelay(300, withTiming(1, { duration: 60, ...easeOut }));
    checkScale.value = withDelay(
      300,
      withSequence(
        withTiming(1.12, { duration: 200, ...easeOut }),
        withTiming(0.97, { duration: 130, ...easeOut }),
        withTiming(1, { duration: 110, ...easeOut })
      )
    );
  }, [checkOpacity, checkScale, draw]);

  const circleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - draw.value),
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    transform: [{ scale: checkScale.value }],
  }));

  const circleBox = size * (86.5 / 112);
  const circleOffset = size * (12.75 / 112);
  const slotWidth = size * (1 - 0.3476 * 2);
  const slotHeight = size * (1 - 0.3952 * 2);
  const checkWidth = slotWidth * (1 + 0.0844 * 2);
  const checkHeight = slotHeight * (1 + 0.1227 + 0.1736);
  const checkLeft = size * 0.3476 - slotWidth * 0.0844;
  const checkTop = size * 0.3952 - slotHeight * 0.1227;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 112 112">
        <Circle cx="56" cy="56" r="56" fill={AppColors.budgetBadgeBg} />
      </Svg>
      <Svg
        width={circleBox}
        height={circleBox}
        viewBox="0 0 86.5 86.5"
        style={[styles.overlay, { left: circleOffset, top: circleOffset }]}>
        <AnimatedPath
          d={CIRCLE_PATH}
          stroke={AppColors.accent}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${CIRCLE_LENGTH} ${CIRCLE_LENGTH}`}
          animatedProps={circleProps}
        />
      </Svg>
      <Animated.View
        style={[
          styles.overlay,
          { left: checkLeft, top: checkTop, width: checkWidth, height: checkHeight },
          checkStyle,
        ]}>
        <Svg width={checkWidth} height={checkHeight} viewBox="0 0 39.8899 30.4179">
          <Path
            d={CHECK_PATH}
            stroke={AppColors.accent}
            strokeWidth={5.76}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
  },
});
