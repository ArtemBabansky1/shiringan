import { useState, useEffect } from 'react';
import { START_DATE, TOTAL_DAYS, dateForDay } from '../lib/dates.js';

export function useTimer() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const end = dateForDay(TOTAL_DAYS);

  if (now < START_DATE) {
    const diff = START_DATE.getTime() - now.getTime();
    return { label: 'До старта пути', diff, phase: 'before' };
  }
  if (now >= end) {
    return { label: '100 дней пройдены', diff: 0, phase: 'done' };
  }
  const diff = end.getTime() - now.getTime();
  return { label: 'До пробуждения Риннэ Шарингана', diff, phase: 'active' };
}
