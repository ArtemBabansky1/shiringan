const DEFAULT_TASK_DEFS = {
  work:        { label: 'Работа',      points: 1, jp: '仕事', type: 'work' },
  gym:         { label: 'Зал',         points: 2, jp: '鍛錬', type: 'gym' },
  impact:      { label: 'Импакт',      points: 2, jp: '衝撃', type: 'impact' },
  mini_impact: { label: 'Мини-импакт', points: 1, jp: '小衝撃', type: 'mini_impact' },
};

const DEFAULT_TASK_GAINS = {
  gym:         { power: 2, mental: 1 },
  impact:      { mental: 2, designer: 2, coder: 2 },
  mini_impact: { mental: 1, designer: 1, coder: 1 },
  work:        { designer: 2, coder: 2 },
};

const DEFAULT_WEEK_SCHED = {
  0: ['impact'],
  1: ['work', 'gym', 'mini_impact'],
  2: ['work', 'impact'],
  3: ['work', 'gym', 'mini_impact'],
  4: ['work', 'impact'],
  5: ['work', 'gym', 'mini_impact'],
  6: ['impact'],
};

module.exports = { DEFAULT_TASK_DEFS, DEFAULT_TASK_GAINS, DEFAULT_WEEK_SCHED };
