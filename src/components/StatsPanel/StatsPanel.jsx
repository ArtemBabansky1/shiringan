import { Swords, Brain, Palette, Code2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import StatBar from './StatBar.jsx';
import styles from './StatsPanel.module.css';

const STAT_CONFIG = [
  { key: 'power',    label: 'СИЛА',      jp: '力',  color: 'var(--red-flame)',    icon: <Swords size={14}/> },
  { key: 'mental',   label: 'МЕНТАЛКА',  jp: '心',  color: 'var(--purple-rinne)', icon: <Brain size={14}/> },
  { key: 'designer', label: 'ДИЗАЙНЕР',  jp: '美',  color: 'var(--gold-chakra)',  icon: <Palette size={14}/> },
  { key: 'coder',    label: 'НЕСРТУАЛЬЩИК', jp: '術', color: 'var(--blue-coder)', icon: <Code2 size={14}/> },
  { key: 'aura',     label: 'АУРА',      jp: '気',  color: 'var(--red-flame)',    icon: <Sparkles size={14}/> },
];

export default function StatsPanel() {
  const { stats } = useApp();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>ХАРАКТЕРИСТИКИ</span>
      </div>
      <div className={styles.bars}>
        {STAT_CONFIG.map(cfg => (
          <StatBar
            key={cfg.key}
            icon={cfg.icon}
            label={cfg.label}
            jp={cfg.jp}
            value={stats[cfg.key] ?? 0}
            color={cfg.color}
          />
        ))}
      </div>
    </div>
  );
}
