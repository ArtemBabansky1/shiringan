import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './StatsPanel.module.css';

export default function StatBar({ icon, label, jp, value, color, prevValue }) {
  const fillRef = useRef(null);
  const numRef = useRef(null);
  const displayRef = useRef({ v: prevValue ?? value });

  useEffect(() => {
    const prev = displayRef.current.v;
    const next = value;
    if (Math.abs(prev - next) < 0.01) return;

    if (fillRef.current) {
      gsap.fromTo(fillRef.current,
        { width: `${prev}%` },
        { width: `${next}%`, duration: 1.2, ease: 'power2.out' }
      );
    }

    if (numRef.current) {
      const obj = { v: prev };
      gsap.to(obj, {
        v: next,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = Math.round(obj.v);
        },
      });
    }

    if (next > prev && fillRef.current) {
      gsap.fromTo(fillRef.current,
        { filter: `brightness(2) drop-shadow(0 0 8px ${color})` },
        { filter: `brightness(1) drop-shadow(0 0 0px ${color})`, duration: 0.6, delay: 0.2 }
      );
    } else if (next < prev && fillRef.current) {
      gsap.fromTo(fillRef.current.parentElement,
        { x: -3 },
        { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
      );
    }

    displayRef.current.v = next;
  }, [value]);

  const isAura = label === 'АУРА';
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.statBar}>
      <div className={styles.statBarHeader}>
        <div className={styles.statBarLeft}>
          {icon}
          <span className={styles.statLabel}>{label}</span>
          <span className={styles.statJp}>{jp}</span>
        </div>
        <span className={styles.statValue} ref={numRef}>{Math.round(value)}</span>
        <span className={styles.statMax}> / 100</span>
      </div>
      <div className={styles.statTrack}>
        <div
          ref={fillRef}
          className={`${styles.statFill} ${isAura ? styles.auraFill : ''}`}
          style={{
            width: `${pct}%`,
            '--stat-color': color,
          }}
        />
        {isAura && value > 95 && <div className={styles.auraSparks} />}
      </div>
    </div>
  );
}
