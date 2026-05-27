import { useMemo } from 'react';
import { recalcAllStats, sumTotalPoints, calcStreak, daysWithProgress, perfectDays } from '../lib/statsEngine.js';

export function useStats(completed, cfg) {
  return useMemo(() => {
    const todayIdx = cfg?.todayIndex?.() ?? 0;
    const stats = recalcAllStats(completed, todayIdx, cfg);
    const totalPts = sumTotalPoints(completed, cfg);
    const streak = calcStreak(completed, todayIdx, cfg);
    const days = daysWithProgress(completed, cfg);
    const perfect = perfectDays(completed, cfg);
    return { ...stats, totalPts, streak, days, perfect };
  }, [completed, cfg]);
}
