let initialized = false;
let muted = true;
let Tone = null;

export async function initSounds() {
  if (initialized) return;
  try {
    Tone = await import('tone');
    await Tone.start();
    initialized = true;
  } catch (e) {
    console.warn('Tone.js init failed', e);
  }
}

export function playTaskCheck() {
  if (muted || !initialized || !Tone) return;
  try {
    const synth = new Tone.MetalSynth({
      frequency: 200,
      envelope: { attack: 0.001, decay: 0.15, release: 0.05 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    }).toDestination();
    synth.volume.value = -18;
    synth.triggerAttackRelease('C5', '16n');
    setTimeout(() => synth.dispose(), 500);
  } catch (e) { /* ignore */ }
}

export function playStageUpgrade() {
  if (muted || !initialized || !Tone) return;
  try {
    const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    synth.volume.value = -12;
    const now = Tone.now();
    synth.triggerAttackRelease(['C2', 'G2'], '2n', now);
    synth.triggerAttackRelease(['C4', 'E4', 'G4'], '4n', now + 0.3);
    setTimeout(() => synth.dispose(), 2000);
  } catch (e) { /* ignore */ }
}

export function playHover() {
  if (muted || !initialized || !Tone) return;
  try {
    const synth = new Tone.Synth({ oscillator: { type: 'sine' } }).toDestination();
    synth.volume.value = -35;
    synth.triggerAttackRelease('A6', '64n');
    setTimeout(() => synth.dispose(), 200);
  } catch (e) { /* ignore */ }
}

export function playDecay() {
  if (muted || !initialized || !Tone) return;
  try {
    const synth = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.1, decay: 0.8, sustain: 0.1, release: 0.5 },
    }).toDestination();
    synth.volume.value = -20;
    synth.triggerAttackRelease('C1', '4n');
    setTimeout(() => synth.dispose(), 1500);
  } catch (e) { /* ignore */ }
}

export function setMuted(v) {
  muted = v;
}

export function getMuted() {
  return muted;
}
