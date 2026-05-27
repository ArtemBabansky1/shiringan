import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import { useStats } from '../hooks/useStats.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { currentStage } from '../data/stages.js';
import { TASK_DEFS as DEFAULT_TASK_DEFS } from '../data/tasks.js';
import { computeMaxPoints, sumTotalPoints } from '../lib/statsEngine.js';
import { makeDateUtils, TOTAL_DAYS as DEFAULT_TOTAL } from '../lib/dates.js';
import { playTaskCheck, playStageUpgrade } from '../lib/sounds.js';
import { fetchProgress, patchProgress, bulkProgress, resetProgress } from '../api/progress.js';
import { fetchProfile } from '../api/profile.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user } = useAuth();

  const [completed, setCompleted] = useState({});
  const [profileData, setProfileData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [muted, setMuted] = useLocalStorage('sharingan100_muted', true);
  const [toasts, setToasts] = useState([]);

  // Загрузка данных при входе
  useEffect(() => {
    if (!user) { setCompleted({}); setProfileData(null); setIsSyncing(false); return; }
    setIsSyncing(true);
    Promise.all([fetchProgress(), fetchProfile()]).then(([prog, prof]) => {
      setCompleted(prog.data?.completed ?? {});
      const p = prof.data ?? null;
      setProfileData(p);

      // Установить selectedDay на сегодня
      if (p) {
        const utils = makeDateUtils(p.startDate, p.totalDays);
        const ti = utils.todayIndex();
        setSelectedDay(Math.max(0, Math.min(ti, (p.totalDays || DEFAULT_TOTAL) - 1)));
      }

      // Предложить импорт старого localStorage
      const old = localStorage.getItem('sharingan100_completed_v2');
      if (old) {
        try {
          const parsed = JSON.parse(old);
          if (parsed && Object.keys(parsed).length > 0 && Object.keys(prog.data?.completed ?? {}).length === 0) {
            bulkProgress(parsed).then(() => {
              setCompleted(parsed);
              localStorage.removeItem('sharingan100_completed_v2');
            });
          } else {
            localStorage.removeItem('sharingan100_completed_v2');
          }
        } catch {}
      }
    }).finally(() => setIsSyncing(false));
  }, [user?.id]);

  // Конфиг из профиля (или дефолты)
  const cfg = useMemo(() => {
    if (!profileData) return null;
    const utils = makeDateUtils(profileData.startDate, profileData.totalDays);
    return {
      totalDays:       profileData.totalDays,
      taskDefs:        profileData.taskDefs,
      taskGains:       profileData.taskGains,
      weekSched:       profileData.weekSched,
      dateForDay:      utils.dateForDay.bind(utils),
      todayIndex:      utils.todayIndex.bind(utils),
      formatDateShort: utils.formatDateShort.bind(utils),
      START_DATE:      utils.START_DATE,
    };
  }, [profileData]);

  const todayIdx = useMemo(() => cfg?.todayIndex?.() ?? 0, [cfg]);
  const TOTAL_DAYS = profileData?.totalDays ?? DEFAULT_TOTAL;
  const TASK_DEFS = profileData?.taskDefs ?? DEFAULT_TASK_DEFS;

  const MAX_POINTS = useMemo(() => computeMaxPoints(cfg), [cfg]);
  const stats = useStats(completed, cfg);
  const totalPts = stats.totalPts;
  const { stage, stageIdx } = useMemo(() => currentStage(totalPts, MAX_POINTS), [totalPts, MAX_POINTS]);

  const addToast = useCallback((msg, type = 'default') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3100);
  }, []);

  const toggleTask = useCallback(async (dayIdx, taskKey) => {
    if (dayIdx > todayIdx) { addToast('Будущее ещё не наступило'); return; }

    const prevPts = sumTotalPoints(completed, cfg);
    const prevStage = currentStage(prevPts, MAX_POINTS).stageIdx;
    const newDone = !(completed[dayIdx]?.[taskKey]);

    // Оптимистичное обновление
    setCompleted(prev => {
      const dayData = { ...(prev[dayIdx] || {}) };
      if (newDone) dayData[taskKey] = true;
      else delete dayData[taskKey];
      const next = { ...prev };
      if (Object.keys(dayData).length === 0) delete next[dayIdx];
      else next[dayIdx] = dayData;
      return next;
    });

    playTaskCheck();

    setTimeout(() => {
      const newPts = sumTotalPoints(completed, cfg);
      const newStage = currentStage(newPts, MAX_POINTS).stageIdx;
      if (newStage > prevStage) {
        playStageUpgrade();
        addToast('万華鏡写輪眼 · ПРОБУЖДЕНИЕ!', 'upgrade');
      }
    }, 50);

    const { error } = await patchProgress(dayIdx, taskKey, newDone);
    if (error) {
      // Откат
      setCompleted(prev => {
        const dayData = { ...(prev[dayIdx] || {}) };
        if (!newDone) dayData[taskKey] = true; else delete dayData[taskKey];
        const next = { ...prev };
        if (Object.keys(dayData).length === 0) delete next[dayIdx];
        else next[dayIdx] = dayData;
        return next;
      });
      addToast('Ошибка сохранения');
    }
  }, [completed, todayIdx, addToast, cfg, MAX_POINTS]);

  const resetAll = useCallback(async () => {
    setCompleted({});
    await resetProgress();
    addToast('Прогресс обнулён');
  }, [addToast]);

  const exportData = useCallback(() => {
    return JSON.stringify({ completed, v: 2 }, null, 2);
  }, [completed]);

  const importData = useCallback(async (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') throw new Error('bad');
      const data = parsed.completed || parsed || {};
      setCompleted(data);
      await bulkProgress(data);
      addToast('Прогресс загружен');
      return true;
    } catch {
      addToast('Ошибка: невалидный JSON');
      return false;
    }
  }, [addToast]);

  const getTasksForDay = useCallback((dayIdx) => {
    if (!cfg) return [];
    const weekSched = cfg.weekSched || {};
    const d = cfg.dateForDay(dayIdx);
    return weekSched[d.getDay()] || [];
  }, [cfg]);

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
    TOTAL_DAYS,
    profileData,
    setProfileData,
    isSyncing,
    cfg,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
