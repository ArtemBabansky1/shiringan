import { Eye, Calendar, Scroll } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './BottomNav.module.css';

const TABS = [
  { id: 'sharingan', label: 'Шаринган', icon: Eye },
  { id: 'chronicle', label: 'Хроника',  icon: Calendar },
  { id: 'menu',      label: 'Меню',     icon: Scroll },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className={styles.nav}>
      {TABS.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={isActive ? 22 : 20} />
            <span className={styles.label}>{tab.label}</span>
            {isActive && <motion.div className={styles.indicator} layoutId="nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}
