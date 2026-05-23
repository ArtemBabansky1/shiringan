import { useTimer } from '../../hooks/useTimer.js';
import styles from './Header.module.css';

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatDiff(ms) {
  const totalSec = Math.floor(ms / 1000);
  const days  = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins  = Math.floor((totalSec % 3600) / 60);
  const secs  = totalSec % 60;
  return { days, hours, mins, secs };
}

export default function Timer() {
  const { label, diff, phase } = useTimer();
  const { days, hours, mins, secs } = formatDiff(diff);

  return (
    <div className={styles.timerWrap}>
      <span className={styles.timerLabel}>{label}</span>
      {phase === 'done' ? (
        <span className={styles.timerValue}>完 · END</span>
      ) : (
        <span className={styles.timerValue}>
          <span>{pad(days)}<small className={styles.timerUnit}>д</small></span>
          <span className={styles.timerSep}>·</span>
          <span>{pad(hours)}<small className={styles.timerUnit}>ч</small></span>
          <span className={styles.timerSep}>·</span>
          <span>{pad(mins)}<small className={styles.timerUnit}>м</small></span>
          <span className={styles.timerSep}>·</span>
          <span>{pad(secs)}<small className={styles.timerUnit}>с</small></span>
        </span>
      )}
    </div>
  );
}
