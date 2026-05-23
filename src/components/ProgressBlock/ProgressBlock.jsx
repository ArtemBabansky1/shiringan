import { useApp } from '../../context/AppContext.jsx';
import styles from './ProgressBlock.module.css';

export default function ProgressBlock() {
  const { stats } = useApp();

  return (
    <div className={styles.grid}>
      <div className={styles.stat}>
        <div className={styles.statValue}>{stats.days}</div>
        <div className={styles.statLabel}>дней</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.statValue}>{stats.streak}</div>
        <div className={styles.statLabel}>страйк</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.statValue}>{stats.perfect}</div>
        <div className={styles.statLabel}>идеал</div>
      </div>
    </div>
  );
}
