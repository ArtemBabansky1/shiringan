import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from './hooks/useMediaQuery.js';
import { useSounds } from './hooks/useSounds.js';
import Header from './components/Header/Header.jsx';
import SharinganDisplay from './components/SharinganDisplay/SharinganDisplay.jsx';
import StatsPanel from './components/StatsPanel/StatsPanel.jsx';
import ProgressBlock from './components/ProgressBlock/ProgressBlock.jsx';
import DayGrid from './components/DayGrid/DayGrid.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import QuoteBlock from './components/QuoteBlock/QuoteBlock.jsx';
import BottomNav from './components/BottomNav/BottomNav.jsx';
import Toast from './components/Toast/Toast.jsx';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.jsx';
import styles from './App.module.css';

function DesktopLayout() {
  return (
    <main className={styles.main}>
      <aside className={styles.panelLeft}>
        <SharinganDisplay />
        <StatsPanel />
        <ProgressBlock />
      </aside>

      <section className={styles.panelCenter}>
        <DayGrid />
      </section>

      <aside className={styles.panelRight}>
        <TaskList />
        <QuoteBlock />
      </aside>
    </main>
  );
}

const tabVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

function MobileLayout() {
  const [activeTab, setActiveTab] = useState('sharingan');
  const [prevTab, setPrevTab] = useState('sharingan');

  const tabOrder = ['sharingan', 'chronicle', 'menu'];
  const dir = tabOrder.indexOf(activeTab) > tabOrder.indexOf(prevTab) ? 1 : -1;

  function handleTabChange(tab) {
    setPrevTab(activeTab);
    setActiveTab(tab);
  }

  return (
    <>
      <div className={styles.mobileContent}>
        <AnimatePresence mode="wait" custom={dir}>
          {activeTab === 'sharingan' && (
            <motion.div
              key="sharingan"
              className={styles.mobileTab}
              custom={dir}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) handleTabChange('chronicle');
              }}
            >
              <div className={styles.mobilePad}>
                <SharinganDisplay />
                <StatsPanel />
                <ProgressBlock />
              </div>
            </motion.div>
          )}
          {activeTab === 'chronicle' && (
            <motion.div
              key="chronicle"
              className={styles.mobileTab}
              custom={dir}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50) handleTabChange('sharingan');
                if (info.offset.x < -50) handleTabChange('menu');
              }}
            >
              <div className={styles.mobilePad}>
                <DayGrid />
              </div>
            </motion.div>
          )}
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              className={styles.mobileTab}
              custom={dir}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50) handleTabChange('chronicle');
              }}
            >
              <div className={styles.mobilePad}>
                <TaskList />
                <QuoteBlock />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}

export default function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  useSounds();

  return (
    <div className={styles.app}>
      <ParticlesBackground />
      <Header />
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      <Toast />
    </div>
  );
}
