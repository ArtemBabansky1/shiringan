import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../context/AppContext.jsx';
import { CHARACTERS, characterPortraitSVG } from '../../data/characters.js';
import { quoteForDay } from '../../data/quotes.js';
import { todayIndex } from '../../lib/dates.js';
import styles from './QuoteBlock.module.css';

function CharacterPortrait({ character }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const svgMarkup = characterPortraitSVG(character);

  return (
    <div className={styles.portraitSection}>
      <div
        className={styles.portraitFallbackSvg}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
      {!imgError && (
        <img
          src={character.image}
          alt={character.name}
          className={`${styles.portraitImg} ${imgLoaded ? styles.loaded : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}

export default function QuoteBlock() {
  const { selectedDay } = useApp();
  const idx = selectedDay !== null && selectedDay !== undefined ? selectedDay : Math.max(0, todayIndex());
  const quote = quoteForDay(idx);
  const character = CHARACTERS[quote.c];

  return (
    <div className={styles.block}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={styles.inner}
        >
          {character && <CharacterPortrait character={character} />}
          <div className={styles.infoArea}>
            <div className={styles.charMeta}>
              <span className={styles.charName}>{character?.name || '—'}</span>
              <span className={styles.charJp}>{character?.jp || '—'}</span>
              <span className={styles.charTitle}>{character?.title || '—'}</span>
            </div>
            <p className={styles.quoteText}>{quote.t}</p>
            <div className={styles.quoteMeta}>день {Math.min(idx + 1, 100)}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
