const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET } = require('../config');
const { DEFAULT_TASK_DEFS, DEFAULT_TASK_GAINS, DEFAULT_WEEK_SCHED } = require('../defaults');

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

function makeToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email и пароль обязательны' });
  if (password.length < 6) return res.status(400).json({ error: 'Пароль минимум 6 символов' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (existing) return res.status(409).json({ error: 'Email уже зарегистрирован' });

  const pwd_hash = bcrypt.hashSync(password, 10);
  const today = new Date().toISOString().slice(0, 10);

  const { lastInsertRowid } = db.prepare(
    'INSERT INTO users (email, pwd_hash) VALUES (?, ?)'
  ).run(email.toLowerCase(), pwd_hash);
  const userId = Number(lastInsertRowid);

  db.prepare(`
    INSERT INTO profiles (user_id, total_days, start_date, task_defs, task_gains, week_sched)
    VALUES (?, 100, ?, ?, ?, ?)
  `).run(
    userId,
    today,
    JSON.stringify(DEFAULT_TASK_DEFS),
    JSON.stringify(DEFAULT_TASK_GAINS),
    JSON.stringify(DEFAULT_WEEK_SCHED),
  );

  const user = { id: userId, email: email.toLowerCase() };
  res.cookie('token', makeToken(user), COOKIE_OPTS);
  res.status(201).json({ user });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email и пароль обязательны' });

  const row = db.prepare('SELECT id, email, pwd_hash FROM users WHERE email = ?').get(email.toLowerCase());
  if (!row || !bcrypt.compareSync(password, row.pwd_hash))
    return res.status(401).json({ error: 'Неверный email или пароль' });

  const user = { id: row.id, email: row.email };
  res.cookie('token', makeToken(user), COOKIE_OPTS);
  res.json({ user });
});

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  let token = req.cookies?.token;
  if (!token) {
    const h = req.headers['authorization'];
    if (h?.startsWith('Bearer ')) token = h.slice(7);
  }
  if (!token) return res.status(401).json({ error: 'Не авторизован' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = db.prepare('SELECT id, email FROM users WHERE id = ?').get(payload.id);
    if (!user) return res.status(401).json({ error: 'Пользователь не найден' });
    res.json({ user });
  } catch {
    res.status(401).json({ error: 'Токен недействителен' });
  }
});

module.exports = router;
