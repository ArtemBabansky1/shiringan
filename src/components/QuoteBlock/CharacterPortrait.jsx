import { useState } from 'react';
import { characterPortraitSVG } from '../../data/characters.js';
import styles from './QuoteBlock.module.css';

export default function CharacterPortrait({ character }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const svgMarkup = characterPortraitSVG(character);

  return (
    <div className={styles.portrait}>
      <div
        className={styles.portraitSvg}
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
