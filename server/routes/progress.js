const router = require('express').Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

function rowsToCompleted(rows) {
  const completed = {};
  for (const r of rows) {
    if (r.done) {
      if (!completed[r.day_idx]) completed[r.day_idx] = {};
      completed[r.day_idx][r.task_key] = true;
    }
  }
  return completed;
}

// GET /api/progress
router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT day_idx, task_key, done FROM progress WHERE user_id = ?').all(req.user.id);
  res.json({ completed: rowsToCompleted(rows) });
});

// PATCH /api/progress
router.patch('/', requireAuth, (req, res) => {
  const { dayIdx, taskKey, done } = req.body;
  if (dayIdx === undefined || !taskKey) return res.status(400).json({ error: 'dayIdx и taskKey обязательны' });

  if (done) {
    db.prepare(`
      INSERT INTO progress (user_id, day_idx, task_key, done) VALUES (?, ?, ?, 1)
      ON CONFLICT(user_id, day_idx, task_key) DO UPDATE SET done = 1
    `).run(req.user.id, dayIdx, taskKey);
  } else {
    db.prepare('DELETE FROM progress WHERE user_id = ? AND day_idx = ? AND task_key = ?')
      .run(req.user.id, dayIdx, taskKey);
  }

  res.json({ dayIdx, taskKey, done: !!done });
});

// PUT /api/progress/bulk
router.put('/bulk', requireAuth, (req, res) => {
  const { completed } = req.body;
  if (!completed || typeof completed !== 'object') return res.status(400).json({ error: 'completed обязателен' });

  const deleteAll = db.prepare('DELETE FROM progress WHERE user_id = ?');
  const insert = db.prepare('INSERT INTO progress (user_id, day_idx, task_key, done) VALUES (?, ?, ?, 1)');

  db.exec('BEGIN');
  try {
    deleteAll.run(req.user.id);
    for (const [dayIdx, tasks] of Object.entries(completed)) {
      for (const [taskKey, val] of Object.entries(tasks)) {
        if (val) insert.run(req.user.id, Number(dayIdx), taskKey);
      }
    }
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    return res.status(500).json({ error: 'Ошибка импорта' });
  }

  res.json({ ok: true });
});

// DELETE /api/progress
router.delete('/', requireAuth, (req, res) => {
  db.prepare('DELETE FROM progress WHERE user_id = ?').run(req.user.id);
  res.json({ ok: true });
});

module.exports = router;
