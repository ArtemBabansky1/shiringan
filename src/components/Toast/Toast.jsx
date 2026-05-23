import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../context/AppContext.jsx';
import styles from './Toast.module.css';

export default function Toast() {
  const { toasts } = useApp();

  return (
    <div className={styles.host}>
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            className={`${styles.toast} ${toast.type === 'upgrade' ? styles.upgrade : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {toast.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
