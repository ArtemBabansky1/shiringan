const router = require('express').Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');
const { DEFAULT_TASK_DEFS, DEFAULT_TASK_GAINS, DEFAULT_WEEK_SCHED } = require('../defaults');

function parseProfile(row) {
  return {
    totalDays: row.total_days,
    startDate: row.start_date,
    taskDefs:  JSON.parse(row.task_defs  || '{}') || DEFAULT_TASK_DEFS,
    taskGains: JSON.parse(row.task_gains || '{}') || DEFAULT_TASK_GAINS,
    weekSched: JSON.parse(row.week_sched || '{}') || DEFAULT_WEEK_SCHED,
  };
}

// GET /api/profile
router.get('/', requireAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.user.id);
  if (!row) return res.status(404).json({ error: 'Профиль не найден' });
  res.json(parseProfile(row));
});

// PATCH /api/profile
router.patch('/', requireAuth, (req, res) => {
  const { totalDays, startDate, taskDefs, taskGains, weekSched } = req.body;

  const row = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.user.id);
  if (!row) return res.status(404).json({ error: 'Профиль не найден' });

  const updates = {
    total_days: totalDays  !== undefined ? Number(totalDays) : row.total_days,
    start_date: startDate  !== undefined ? startDate          : row.start_date,
    task_defs:  taskDefs   !== undefined ? JSON.stringify(taskDefs)  : row.task_defs,
    task_gains: taskGains  !== undefined ? JSON.stringify(taskGains) : row.task_gains,
    week_sched: weekSched  !== undefined ? JSON.stringify(weekSched) : row.week_sched,
  };

  db.prepare(`
    UPDATE profiles
    SET total_days = ?, start_date = ?, task_defs = ?, task_gains = ?, week_sched = ?
    WHERE user_id = ?
  `).run(updates.total_days, updates.start_date, updates.task_defs, updates.task_gains, updates.week_sched, req.user.id);

  const updated = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.user.id);
  res.json(parseProfile(updated));
});

module.exports = router;
