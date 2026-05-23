import { useMemo } from 'react';
import { recalcAllStats, sumTotalPoints, calcStreak, daysWithProgress, perfectDays } from '../lib/statsEngine.js';
import { todayIndex } from '../lib/dates.js';

export function useStats(completed) {
  const todayIdx = useMemo(() => todayIndex(), []);

  return useMemo(() => {
    const stats = recalcAllStats(completed, todayIdx);
    const totalPts = sumTotalPoints(completed);
    const streak = calcStreak(completed, todayIdx);
    const days = daysWithProgress(completed);
    const perfect = perfectDays(completed);
    return { ...stats, totalPts, streak, days, perfect };
  }, [completed, todayIdx]);
}
