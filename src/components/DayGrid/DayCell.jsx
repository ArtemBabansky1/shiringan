import React, { memo } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { dateForDay, WEEKDAY_RU, formatDate } from '../../lib/dates.js';
import { maxPointsForDay, pointsForDay } from '../../lib/statsEngine.js';
import { WEEK_SCHEDULE } from '../../data/schedule.js';
import styles from './DayGrid.module.css';

const DayCell = memo(function DayCell({ dayIdx, isMobile, style }) {
  const { selectedDay, setSelectedDay, todayIdx, completed, isDone, addToast } = useApp();

  const d = dateForDay(dayIdx);
  const dow = d.getDay();
  const tasks = WEEK_SCHEDULE[dow] || [];
  const pts = pointsForDay(dayIdx, completed);
  const maxPts = maxPointsForDay(dayIdx);

  const isToday = dayIdx === todayIdx;
  const isFuture = dayIdx > todayIdx;
  const isSelected = dayIdx === selectedDay;
  const isPerfect = maxPts > 0 && pts === maxPts;
  const isPartial = pts > 0 && !isPerfect;

  const GRID_COLS = isMobile ? 5 : 10;
  const row = Math.floor(dayIdx / GRID_COLS);

  function handleClick() {
    if (isFuture) {
      addToast('Будущее ещё не наступило');
      return;
    }
    setSelectedDay(dayIdx);
  }

  const cls = [styles.dayCell];
  if (isToday) cls.push(styles.today);
  if (isFuture) cls.push(styles.future);
  if (isSelected) cls.push(styles.selected);
  if (isPerfect) cls.push(styles.perfect);
  else if (isPartial) cls.push(styles.partial);

  return (
    <div
      className={cls.join(' ')}
      onClick={handleClick}
      title={`${formatDate(d)} · ${WEEKDAY_RU[dow]}`}
      style={{ zIndex: isToday ? 100 : Math.max(1, 50 - row), ...style }}
    >
      <div className={styles.dayNum}>{dayIdx + 1}</div>
      <div className={styles.dayDots}>
        {tasks.map(t => (
          <span
            key={t}
            className={`${styles.dayDot} ${isDone(dayIdx, t) ? styles.done : ''} ${t === 'work' ? styles.work : ''}`}
          />
        ))}
      </div>
    </div>
  );
});

export default DayCell;
