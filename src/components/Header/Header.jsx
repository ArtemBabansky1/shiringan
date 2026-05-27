import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Download, Upload, RotateCcw, Menu, X, Settings, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { setMuted } from '../../lib/sounds.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import Timer from './Timer.jsx';
import Modal from '../Modal/Modal.jsx';
import styles from './Header.module.css';

export default function Header() {
  const { muted, setMuted: setMutedCtx, todayIdx, setSelectedDay, addToast, exportData, importData, resetAll, TOTAL_DAYS } = useApp();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);

  function handleGoToday() {
    if (todayIdx < 0) { addToast('Путь ещё не начался'); return; }
    if (todayIdx >= TOTAL_DAYS) { addToast('Путь завершён'); return; }
    setSelectedDay(todayIdx);
  }

  function handleToggleMute() {
    const next = !muted;
    setMutedCtx(next);
    setMuted(next);
  }

  function handleExport() {
    setModal({ type: 'export', data: exportData() });
    setMenuOpen(false);
  }

  function handleImport() {
    setModal({ type: 'import' });
    setMenuOpen(false);
  }

  function handleReset() {
    if (!window.confirm('Сбросить весь прогресс? Это необратимо.')) return;
    resetAll();
    setMenuOpen(false);
  }

  const buttons = (
    <>
      <button className={styles.btn} onClick={handleGoToday}>Сегодня</button>
      <button className={styles.btn} onClick={handleExport}><Download size={13}/> Экспорт</button>
      <button className={styles.btn} onClick={handleImport}><Upload size={13}/> Импорт</button>
      <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}><RotateCcw size={13}/> Сброс</button>
      <button className={styles.btn} onClick={() => { navigate('/settings'); setMenuOpen(false); }}><Settings size={13}/></button>
      <button className={styles.btn} onClick={() => { logout(); setMenuOpen(false); }}><LogOut size={13}/></button>
    </>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.brandJp}>写輪眼</span>
          {!isMobile && <span className={styles.brandEn}>Путь шиноби</span>}
        </div>

        <Timer />

        <div className={styles.headerRight}>
          <button className={styles.muteBtn} onClick={handleToggleMute} title={muted ? 'Включить звук' : 'Выключить звук'}>
            {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}
          </button>
          {isMobile ? (
            <button className={styles.menuBtn} onClick={() => setMenuOpen(o => !o)}>
              {menuOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          ) : buttons}
        </div>
      </header>

      {isMobile && menuOpen && (
        <div className={styles.mobileMenu}>
          {buttons}
        </div>
      )}

      {modal && (
        <Modal
          type={modal.type}
          initialData={modal.data}
          onClose={() => setModal(null)}
          onImport={importData}
        />
      )}
    </>
  );
}
