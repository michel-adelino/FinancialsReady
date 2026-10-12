import { CircleCheck, Home } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { AppColors, FontFamily, Radius } from '@/core/theme';

const SIZE = 188;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 0.67;

/** Decorative budget ring preview for onboarding step 3. */
export function BudgetIllustration() {
  const strokeDashoffset = CIRCUMFERENCE * (1 - PROGRESS);

  return (
    <View style={styles.stage}>
      <View style={styles.halo} />

      <View style={styles.ringWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={AppColors.splashAccent}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>
        <View style={styles.ringCenter}>
          <Text style={styles.leftLabel}>LEFT TO SPEND</Text>
          <Text style={styles.leftAmount}>$1,051.70</Text>
          <Text style={styles.leftMeta}>of $3,200.00 planned</Text>
        </View>
      </View>

      <View style={styles.statusPill}>
        <CircleCheck size={13} color={AppColors.splashAccent} strokeWidth={2.2} />
        <Text style={styles.statusText}>67% used</Text>
      </View>

      <View style={styles.categoryCard}>
        <View style={styles.categoryRow}>
          <View style={styles.categoryIcon}>
            <Home size={16} color={AppColors.white} strokeWidth={1.9} />
          </View>
          <View style={styles.categoryCopy}>
            <View style={styles.categoryTop}>
              <Text style={styles.categoryName}>Housing</Text>
              <Text style={styles.categoryLeft}>$297.71 left</Text>
            </View>
            <View style={styles.categoryBottom}>
              <Text style={styles.categorySpend}>$902.29 of $1,200</Text>
              <Text style={styles.categoryPct}>75%</Text>
            </View>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    height: 340,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  halo: {
    position: 'absolute',
    top: 8,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(152,217,186,0.08)',
  },
  ringWrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    gap: 2,
  },
  leftLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: AppColors.splashAccent,
    letterSpacing: 0.4,
  },
  leftAmount: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: AppColors.white,
  },
  leftMeta: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.splashMuted,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: AppColors.splashAccent,
  },
  categoryCard: {
    width: 316,
    backgroundColor: AppColors.surface,
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: AppColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCopy: {
    flex: 1,
    gap: 3,
  },
  categoryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryName: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: AppColors.text,
  },
  categoryLeft: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: AppColors.accent,
  },
  categoryBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categorySpend: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  categoryPct: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: AppColors.textMuted,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.softSurface,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: AppColors.accent,
  },
});
