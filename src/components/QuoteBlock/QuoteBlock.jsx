import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../context/AppContext.jsx';
import { CHARACTERS } from '../../data/characters.js';
import { quoteForDay } from '../../data/quotes.js';
import { todayIndex } from '../../lib/dates.js';
import CharacterPortrait from './CharacterPortrait.jsx';
import styles from './QuoteBlock.module.css';

export default function QuoteBlock() {
  const { selectedDay } = useApp();
  const idx = selectedDay !== null && selectedDay !== undefined ? selectedDay : Math.max(0, todayIndex());
  const quote = quoteForDay(idx);
  const character = CHARACTERS[quote.c];

  return (
    <div className={styles.block}>
      <div className={styles.glowCorner} />
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className={styles.content}
        >
          <div className={styles.header}>
            {character && <CharacterPortrait character={character} />}
            <div className={styles.charInfo}>
              <span className={styles.charName}>{character?.name || '—'}</span>
              <span className={styles.charJp}>{character?.jp || '—'}</span>
              <span className={styles.charTitle}>{character?.title || '—'}</span>
            </div>
          </div>
          <p className={styles.quoteText}>{quote.t}</p>
          <div className={styles.quoteMeta}>
            <span>день {Math.min(idx + 1, 100)}</span>
            <span>「 наставление дня 」</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
