import { useApp } from '../../context/AppContext.jsx';
import { playTaskCheck } from '../../lib/sounds.js';
import styles from './TaskList.module.css';

export default function TaskRow({ dayIdx, taskKey, locked }) {
  const { isDone, toggleTask, TASK_DEFS } = useApp();
  const def = TASK_DEFS[taskKey];
  const done = isDone(dayIdx, taskKey);

  function handleClick() {
    if (locked) return;
    toggleTask(dayIdx, taskKey);
    triggerBurst();
  }

  function triggerBurst() {
    const el = document.createElement('div');
    el.className = styles.burst + ' chakra-burst-particle';
    el.style.cssText = `position:fixed;width:30px;height:30px;pointer-events:none;border-radius:50%;background:radial-gradient(circle,#ff2d2d 0%,#8b0a0a 40%,transparent 70%);z-index:9998;animation:burst 0.7s ease-out forwards;`;
    const rect = document.activeElement?.getBoundingClientRect?.();
    if (rect) {
      el.style.left = (rect.left + rect.width / 2 - 15) + 'px';
      el.style.top = (rect.top + rect.height / 2 - 15) + 'px';
    }
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
  }

  return (
    <div
      className={`${styles.taskRow} ${done ? styles.done : ''} ${locked ? styles.locked : ''}`}
      onClick={handleClick}
    >
      <div className={styles.taskCheck} />
      <span className={styles.taskName}>{def.label}</span>
      <span className={styles.taskJp}>{def.jp}</span>
      <span className={styles.taskPoints}>+{def.points}</span>
    </div>
  );
}
