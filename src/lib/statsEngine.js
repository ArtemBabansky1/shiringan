import { TASK_STAT_GAINS } from '../data/tasks.js';
import { TASK_DEFS } from '../data/tasks.js';
import { WEEK_SCHEDULE } from '../data/schedule.js';
import { dateForDay, TOTAL_DAYS } from './dates.js';

function applyGrowth(currentValue, gain) {
  const cap = 110;
  const newValue = currentValue + gain * (1 - currentValue / cap);
  return Math.min(100, Math.max(0, newValue));
}

function decayPerMissedDay(consecutiveZeroDays) {
  if (consecutiveZeroDays < 3) return 0;
  if (consecutiveZeroDays === 3) return 1;
  if (consecutiveZeroDays === 4) return 2;
  return 3;
}

export function maxPointsForDay(dayIdx) {
  const dow = dateForDay(dayIdx).getDay();
  const tasks = WEEK_SCHEDULE[dow] || [];
  return tasks.reduce((s, t) => s + (TASK_DEFS[t]?.points || 0), 0);
}

export function pointsForDay(dayIdx, completed) {
  const dow = dateForDay(dayIdx).getDay();
  const tasks = WEEK_SCHEDULE[dow] || [];
  const dayCompleted = completed[dayIdx] || {};
  return tasks.reduce((s, t) => s + (dayCompleted[t] ? (TASK_DEFS[t]?.points || 0) : 0), 0);
}

export function computeMaxPoints() {
  let total = 0;
  for (let i = 0; i < TOTAL_DAYS; i++) total += maxPointsForDay(i);
  return total;
}

export const MAX_POINTS = computeMaxPoints();

export function sumTotalPoints(completed) {
  let pts = 0;
  for (let i = 0; i < TOTAL_DAYS; i++) pts += pointsForDay(i, completed);
  return pts;
}

export function calcStreak(completed, todayIdx) {
  let s = 0;
  const ti = Math.min(todayIdx, TOTAL_DAYS - 1);
  for (let i = ti; i >= 0; i--) {
    const max = maxPointsForDay(i);
    if (max > 0 && pointsForDay(i, completed) === max) s++;
    else break;
  }
  return s;
}

export function daysWithProgress(completed) {
  let n = 0;
  for (let i = 0; i < TOTAL_DAYS; i++) if (pointsForDay(i, completed) > 0) n++;
  return n;
}

export function perfectDays(completed) {
  let n = 0;
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const max = maxPointsForDay(i);
    if (max > 0 && pointsForDay(i, completed) === max) n++;
  }
  return n;
}

function calcAura(power, mental, designer, coder, streak) {
  const avg = (power + mental + designer + coder) / 4;
  let multiplier = 1.0;
  if (streak >= 30) multiplier = 1.20;
  else if (streak >= 14) multiplier = 1.15;
  else if (streak >= 7) multiplier = 1.10;
  else if (streak >= 3) multiplier = 1.05;
  return Math.min(100, avg * multiplier);
}

export function recalcAllStats(completed, todayIdx) {
  let stats = { power: 0, mental: 0, designer: 0, coder: 0 };
  let consecutiveZeros = 0;
  const lastDay = Math.min(todayIdx, 99);

  for (let day = 0; day <= lastDay; day++) {
    const dayCompleted = completed[day] || {};
    const dayPoints = pointsForDay(day, completed);
    const maxPts = maxPointsForDay(day);

    if (dayPoints === 0 && maxPts > 0) {
      consecutiveZeros++;
      const decay = decayPerMissedDay(consecutiveZeros);
      if (decay > 0) {
        stats.power    = Math.max(0, stats.power    - decay);
        stats.mental   = Math.max(0, stats.mental   - decay);
        stats.designer = Math.max(0, stats.designer - decay);
        stats.coder    = Math.max(0, stats.coder    - decay);
      }
    } else {
      consecutiveZeros = 0;
      for (const taskKey of Object.keys(dayCompleted)) {
        if (!dayCompleted[taskKey]) continue;
        const gains = TASK_STAT_GAINS[taskKey];
        if (!gains) continue;
        for (const stat of Object.keys(gains)) {
          stats[stat] = applyGrowth(stats[stat], gains[stat]);
        }
      }
    }
  }

  const streak = calcStreak(completed, todayIdx);
  const aura = calcAura(stats.power, stats.mental, stats.designer, stats.coder, streak);
  return { ...stats, aura };
}
