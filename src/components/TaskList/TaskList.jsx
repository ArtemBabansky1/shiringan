import { useApp } from '../../context/AppContext.jsx';
import { dateForDay, WEEKDAY_RU, formatDate } from '../../lib/dates.js';
import TaskRow from './TaskRow.jsx';
import styles from './TaskList.module.css';

export default function TaskList() {
  const { selectedDay, todayIdx, getTasksForDay } = useApp();

  if (selectedDay === null || selectedDay === undefined) {
    return (
      <div className={styles.block}>
        <div className={styles.empty}>Выбери день в хронике</div>
      </div>
    );
  }

  const d = dateForDay(selectedDay);
  const dow = d.getDay();
  const tasks = getTasksForDay(selectedDay);
  const isFuture = selectedDay > todayIdx;
  const isToday = selectedDay === todayIdx;

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <div className={styles.date}>{WEEKDAY_RU[dow]}, {formatDate(d)}</div>
        <div className={styles.dayNum}>День {selectedDay + 1} / 100{isToday ? ' · сегодня' : ''}</div>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.empty}>Нет задач для этого дня</div>
      ) : (
        <div className={styles.list}>
          {tasks.map(taskKey => (
            <TaskRow key={taskKey} dayIdx={selectedDay} taskKey={taskKey} locked={isFuture} />
          ))}
        </div>
      )}
    </div>
  );
}
