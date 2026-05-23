import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useStats } from '../hooks/useStats.js';
import { todayIndex, TOTAL_DAYS } from '../lib/dates.js';
import { WEEK_SCHEDULE } from '../data/schedule.js';
import { TASK_DEFS, TASK_STAT_GAINS } from '../data/tasks.js';
import { currentStage } from '../data/stages.js';
import { MAX_POINTS, sumTotalPoints } from '../lib/statsEngine.js';
import { playTaskCheck, playStageUpgrade } from '../lib/sounds.js';
import { dateForDay } from '../lib/dates.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [completed, setCompleted] = useLocalStorage('sharingan100_completed_v2', {});
  const [selectedDay, setSelectedDay] = useState(() => {
    const ti = todayIndex();
    return Math.max(0, Math.min(ti, TOTAL_DAYS - 1));
  });
  const [muted, setMuted] = useLocalStorage('sharingan100_muted', true);
  const [toasts, setToasts] = useState([]);

  const todayIdx = useMemo(() => todayIndex(), []);
  const stats = useStats(completed);
  const totalPts = stats.totalPts;
  const { stage, stageIdx } = useMemo(() => currentStage(totalPts, MAX_POINTS), [totalPts]);

  const addToast = useCallback((msg, type = 'default') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3100);
  }, []);

  const toggleTask = useCallback((dayIdx, taskKey) => {
    if (dayIdx > todayIdx) {
      addToast('Будущее ещё не наступило');
      return;
    }
    const prevPts = sumTotalPoints(completed);
    const prevStage = currentStage(prevPts, MAX_POINTS).stageIdx;

    setCompleted(prev => {
      const dayData = { ...(prev[dayIdx] || {}) };
      const newVal = !dayData[taskKey];
      if (newVal) dayData[taskKey] = true;
      else delete dayData[taskKey];

      const next = { ...prev };
      if (Object.keys(dayData).length === 0) delete next[dayIdx];
      else next[dayIdx] = dayData;
      return next;
    });

    playTaskCheck();

    setTimeout(() => {
      const newPts = sumTotalPoints(completed);
      const newStage = currentStage(newPts, MAX_POINTS).stageIdx;
      if (newStage > prevStage) {
        playStageUpgrade();
        addToast('万華鏡写輪眼 · ПРОБУЖДЕНИЕ!', 'upgrade');
      }
    }, 50);
  }, [completed, todayIdx, addToast, setCompleted]);

  const resetAll = useCallback(() => {
    setCompleted({});
    addToast('Прогресс обнулён');
  }, [setCompleted, addToast]);

  const exportData = useCallback(() => {
    return JSON.stringify({ completed, v: 2 }, null, 2);
  }, [completed]);

  const importData = useCallback((jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') throw new Error('bad');
      setCompleted(parsed.completed || parsed || {});
      addToast('Прогресс загружен');
      return true;
    } catch {
      addToast('Ошибка: невалидный JSON');
      return false;
    }
  }, [setCompleted, addToast]);

  const getTasksForDay = useCallback((dayIdx) => {
    const d = dateForDay(dayIdx);
    return WEEK_SCHEDULE[d.getDay()] || [];
  }, []);

  const isDone = useCallback((dayIdx, taskKey) => {
    return !!(completed[dayIdx] && completed[dayIdx][taskKey]);
  }, [completed]);

  const value = {
    completed,
    selectedDay,
    setSelectedDay,
    muted,
    setMuted,
    toasts,
    addToast,
    todayIdx,
    stats,
    totalPts,
    stage,
    stageIdx,
    toggleTask,
    resetAll,
    exportData,
    importData,
    getTasksForDay,
    isDone,
    TASK_DEFS,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
