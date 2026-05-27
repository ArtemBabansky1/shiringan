const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, 'data', 'sharingan.db'));

db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT UNIQUE NOT NULL,
    pwd_hash   TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS profiles (
    user_id    INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_days INTEGER NOT NULL DEFAULT 100,
    start_date TEXT    NOT NULL DEFAULT '2026-05-25',
    task_defs  TEXT    NOT NULL DEFAULT '{}',
    task_gains TEXT    NOT NULL DEFAULT '{}',
    week_sched TEXT    NOT NULL DEFAULT '{}'
  );

  CREATE TABLE IF NOT EXISTS progress (
    user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day_idx   INTEGER NOT NULL,
    task_key  TEXT    NOT NULL,
    done      INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id, day_idx, task_key)
  );

  CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
`);

module.exports = db;
