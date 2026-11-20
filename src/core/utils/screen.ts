import { useEffect, useState } from 'react';
import { Dimensions, PixelRatio, type ScaledSize } from 'react-native';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;
const TABLET_MIN_WIDTH = 768;
const SMALL_MAX_WIDTH = 360;
const CONTENT_MAX_WIDTH = 420;

export type ScreenBucket = 'small' | 'medium' | 'tablet';

type ScreenListener = () => void;

let metrics: ScaledSize = Dimensions.get('window');
const listeners = new Set<ScreenListener>();

Dimensions.addEventListener('change', ({ window }) => {
  metrics = window;
  listeners.forEach((listener) => listener());
});

export function useScreenMetrics(): ScaledSize {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const listener = () => setVersion((version) => version + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return metrics;
}

export function getScreenMetrics(): ScaledSize {
  return metrics;
}

export function getScreenBucket(width = metrics.width): ScreenBucket {
  if (width >= TABLET_MIN_WIDTH) return 'tablet';
  if (width < SMALL_MAX_WIDTH) return 'small';
  return 'medium';
}

function layoutWidth(width = metrics.width): number {
  return Math.min(width, CONTENT_MAX_WIDTH);
}

function horizontalRatio(width = metrics.width): number {
  return layoutWidth(width) / BASE_WIDTH;
}

export function scale(size: number, width = metrics.width): number {
  return PixelRatio.roundToNearestPixel(size * horizontalRatio(width));
}

export function verticalScale(size: number, height = metrics.height, width = metrics.width): number {
  const heightRatio = height / BASE_HEIGHT;
  const capped = Math.min(heightRatio, horizontalRatio(width));
  return PixelRatio.roundToNearestPixel(size * capped);
}

export function moderateScale(size: number, factor = 0.5, width = metrics.width): number {
  const scaled = size * horizontalRatio(width);
  return PixelRatio.roundToNearestPixel(size + (scaled - size) * factor);
}

export function contentWidth(width = metrics.width): number {
  return layoutWidth(width);
}
