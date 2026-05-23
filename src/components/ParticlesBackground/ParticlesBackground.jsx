import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';

const BASE_OPTIONS = {
  fullScreen: { enable: false },
  background: { color: 'transparent' },
  fpsLimit: 60,
  particles: {
    number: { value: 40, density: { enable: true, area: 1200 } },
    color: { value: ['#c41e1e', '#8b0a0a', '#d4a017'] },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true,
      direction: 'top',
      speed: { min: 0.2, max: 0.6 },
      straight: false,
      random: true,
      outModes: { default: 'out' },
    },
  },
  detectRetina: true,
};

export default function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  if (!engineReady) return null;

  const options = isMobile
    ? { ...BASE_OPTIONS, particles: { ...BASE_OPTIONS.particles, number: { value: 20, density: { enable: true, area: 800 } } } }
    : BASE_OPTIONS;

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'fixed',
        inset: 0,
        filter: 'blur(2px)',
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
