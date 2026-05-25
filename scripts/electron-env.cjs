delete process.env.ELECTRON_RUN_AS_NODE;

const { spawn, execSync } = require('child_process');
const isWin = process.platform === 'win32';
const PORT = 5173;

// Free port 5173 if occupied by another process
function freePort(port) {
  if (!isWin) return;
  try {
    const out = execSync('netstat -ano', { encoding: 'utf8' });
    const pids = new Set();
    out.split('\n').forEach(line => {
      if (line.includes(`:${port} `) || line.includes(`:${port}\t`)) {
        const m = line.trim().match(/(\d+)\s*$/);
        if (m && m[1] !== '0') pids.add(m[1]);
      }
    });
    pids.forEach(pid => {
      try { execSync(`taskkill /PID ${pid} /F`, { stdio: 'pipe' }); } catch (e) {}
    });
    if (pids.size > 0) console.log(`  Освобождён порт ${port}`);
  } catch (e) {}
}

freePort(PORT);

function run(cmd, args, env) {
  return spawn(cmd, args, { stdio: 'inherit', shell: isWin, env: env || process.env });
}

const vite = run('npx', ['--no', 'vite', '--port', String(PORT), '--strictPort']);
const waiter = run('npx', ['--no', 'wait-on', `http://localhost:${PORT}`]);

waiter.on('exit', (code) => {
  if (code !== 0) return;
  const env = { ...process.env, VITE_PORT: String(PORT) };
  const electron = spawn('npx', ['--no', 'electron', '.'], {
    stdio: 'inherit', shell: isWin, env,
  });
  electron.on('exit', () => { vite.kill(); process.exit(0); });
});

vite.on('exit', (c) => process.exit(c ?? 0));
process.on('SIGINT', () => { vite.kill(); process.exit(0); });
