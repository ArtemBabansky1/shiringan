import { useApp } from '../../context/AppContext.jsx';
import { formatDateShort, dateForDay } from '../../lib/dates.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import DayCell from './DayCell.jsx';
import styles from './DayGrid.module.css';

const START_DATE_STR = '25.05.2026';

export default function DayGrid() {
  const { todayIdx } = useApp();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const endDate = formatDateShort(dateForDay(99));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.titleJp}>百日</span>
          <span>100 Дней · Хроника</span>
        </div>
        <div className={styles.meta}>
          <span>СТАРТ <strong>{START_DATE_STR}</strong></span>
          <span>ФИНАЛ <strong>{endDate}</strong></span>
        </div>
      </div>
      <div className={`${styles.grid} ${isMobile ? styles.gridMobile : ''}`}>
        {Array.from({ length: 100 }, (_, i) => (
          <DayCell key={i} dayIdx={i} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}
