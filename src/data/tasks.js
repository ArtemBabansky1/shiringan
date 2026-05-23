export const TASK_DEFS = {
  work:        { label: 'Работа',      points: 1, jp: '仕事', type: 'work' },
  gym:         { label: 'Зал',         points: 2, jp: '鍛錬', type: 'gym' },
  impact:      { label: 'Импакт',      points: 2, jp: '衝撃', type: 'impact' },
  mini_impact: { label: 'Мини-импакт', points: 1, jp: '小衝撃', type: 'mini_impact' },
};

export const TASK_STAT_GAINS = {
  gym:         { power: 2, mental: 1 },
  impact:      { mental: 2, designer: 2, coder: 2 },
  mini_impact: { mental: 1, designer: 1, coder: 1 },
  work:        { designer: 2, coder: 2 },
};
