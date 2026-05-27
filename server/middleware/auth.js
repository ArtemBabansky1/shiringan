const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function requireAuth(req, res, next) {
  let token = req.cookies?.token;

  if (!token) {
    const header = req.headers['authorization'];
    if (header?.startsWith('Bearer ')) token = header.slice(7);
  }

  if (!token) return res.status(401).json({ error: 'Не авторизован' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Токен недействителен' });
  }
}

module.exports = { requireAuth };
