import { useApp } from '../../context/AppContext.jsx';
import { formatDateShort } from '../../lib/dates.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import DayCell from './DayCell.jsx';
import styles from './DayGrid.module.css';

export default function DayGrid() {
  const { todayIdx, TOTAL_DAYS, cfg } = useApp();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const startDateStr = cfg?.START_DATE
    ? formatDateShort(cfg.START_DATE)
    : '—';
  const endDate = cfg?.dateForDay
    ? formatDateShort(cfg.dateForDay(TOTAL_DAYS - 1))
    : '—';
  const totalLabel = `${TOTAL_DAYS} Дней · Хроника`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.titleJp}>百日</span>
          <span>{totalLabel}</span>
        </div>
        <div className={styles.meta}>
          <span>СТАРТ <strong>{startDateStr}</strong></span>
          <span>ФИНАЛ <strong>{endDate}</strong></span>
        </div>
      </div>
      <div className={`${styles.grid} ${isMobile ? styles.gridMobile : ''}`}>
        {Array.from({ length: TOTAL_DAYS }, (_, i) => (
          <DayCell key={i} dayIdx={i} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}
