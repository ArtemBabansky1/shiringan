import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { sharinganSVGString } from './sharinganSvg.js';
import { STAGES } from '../../data/stages.js';
import { miniSharinganSVG } from './miniSharingan.js';
import { MAX_POINTS } from '../../lib/statsEngine.js';
import styles from './SharinganDisplay.module.css';

export default function SharinganDisplay() {
  const { stageIdx, stage, totalPts } = useApp();
  const prevStageRef = useRef(stageIdx);
  const wrapRef = useRef(null);

  const pct = Math.min(100, (totalPts / MAX_POINTS) * 100);

  useEffect(() => {
    if (prevStageRef.current !== stageIdx && prevStageRef.current !== null) {
      triggerStageFlash();
    }
    prevStageRef.current = stageIdx;
  }, [stageIdx]);

  function triggerStageFlash() {
    const flash = document.createElement('div');
    flash.className = styles.stageFlash;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 900);
  }

  const modeClass = stageIdx === 5 ? styles.rinneMode : stageIdx === 6 ? styles.finalMode : '';

  return (
    <div className={styles.container}>
      <div className={`${styles.sharinganWrap} ${modeClass}`} ref={wrapRef}>
        <svg
          className={styles.sharinganSvg}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: sharinganSVGString(stageIdx) }}
        />
      </div>

      <div className={styles.stageInfo}>
        <div className={styles.stageNameJp}>{stage.jp}</div>
        <div className={styles.stageName}>{stage.name}</div>
      </div>

      <div className={styles.progressBlock}>
        <div className={styles.stageMarkers}>
          {STAGES.map((s, i) => {
            const cls = [styles.stageMarker];
            if (i < stageIdx) cls.push(styles.achieved);
            else if (i === stageIdx) cls.push(styles.achieved, styles.current);
            return (
              <div key={s.key} className={cls.join(' ')} title={`${s.name} · ${Math.round(s.threshold * 100)}%`}>
                <span dangerouslySetInnerHTML={{ __html: miniSharinganSVG(i) }} />
                <span className={styles.tooltip}>{s.name} · {Math.round(s.threshold * 100)}%</span>
              </div>
            );
          })}
        </div>

        <div className={styles.progressTrack}>
          <div
            className={`${styles.progressFill} ${stageIdx >= 5 ? styles.rinne : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className={styles.progressPercent}>
          <strong>{totalPts}</strong> / <span>{MAX_POINTS}</span>
          &nbsp;·&nbsp; <strong>{pct.toFixed(1)}%</strong>
        </div>
      </div>
    </div>
  );
}
