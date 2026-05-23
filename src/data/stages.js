export const STAGES = [
  { key: 'tomoe1',   name: '1 Томоэ',           jp: '写輪眼 · 一',  threshold: 0.00 },
  { key: 'tomoe2',   name: '2 Томоэ',           jp: '写輪眼 · 二',  threshold: 0.15 },
  { key: 'tomoe3',   name: '3 Томоэ',           jp: '写輪眼 · 三',  threshold: 0.30 },
  { key: 'mangekyo', name: 'Мангекё Шаринган',  jp: '万華鏡写輪眼', threshold: 0.50 },
  { key: 'eternal',  name: 'Вечный Мангекё',    jp: '永遠の万華鏡', threshold: 0.70 },
  { key: 'rinnegan', name: 'Риннеган',          jp: '輪廻眼',       threshold: 0.85 },
  { key: 'rinne',    name: 'Риннэ Шаринган',    jp: '輪廻写輪眼',   threshold: 0.95 },
];

export function currentStage(pts, maxPts) {
  let stage = STAGES[0];
  let stageIdx = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (pts / maxPts >= STAGES[i].threshold) {
      stage = STAGES[i];
      stageIdx = i;
    }
  }
  return { stage, stageIdx };
}
