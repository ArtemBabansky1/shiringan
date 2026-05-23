import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.css';

export default function Modal({ type, initialData, onClose, onImport }) {
  const [text, setText] = useState(type === 'export' ? (initialData || '') : '');
  const isExport = type === 'export';

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  async function handleAction() {
    if (isExport) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Скопировано в буфер!');
      } catch {
        const ta = document.getElementById('modal-ta');
        ta?.select();
        document.execCommand('copy');
      }
    } else {
      const ok = onImport(text);
      if (ok) onClose();
    }
  }

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.topLine} />
        <h3 className={styles.title}>{isExport ? 'Экспорт прогресса' : 'Импорт прогресса'}</h3>
        <p className={styles.note}>
          {isExport
            ? 'Сохрани этот код — это копия твоего прогресса.'
            : 'Вставь сюда ранее сохранённый JSON и нажми «Применить».'}
        </p>
        <textarea
          id="modal-ta"
          className={styles.textarea}
          value={text}
          readOnly={isExport}
          onChange={(e) => setText(e.target.value)}
          placeholder={isExport ? '' : 'Вставь JSON...'}
          spellCheck={false}
        />
        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose}>Закрыть</button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAction}>
            {isExport ? 'Скопировать' : 'Применить'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
