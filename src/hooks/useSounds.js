import { useEffect } from 'react';
import { initSounds } from '../lib/sounds.js';

export function useSounds() {
  useEffect(() => {
    const handler = () => {
      initSounds();
      window.removeEventListener('click', handler);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);
}
