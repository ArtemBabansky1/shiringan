const BASE = '/api';

function getCsrf() {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };

  const csrf = getCsrf();
  if (csrf) headers['X-XSRF-TOKEN'] = csrf;

  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { data: null, error: data.message || data.error || `HTTP ${res.status}` };
    return { data, error: null };
  } catch {
    return { data: null, error: 'network_error' };
  }
}

export async function initCsrf() {
  try { await fetch('/sanctum/csrf-cookie', { credentials: 'include' }); } catch {}
}

export const apiGet   = (path)       => request('GET',    path);
export const apiPost  = (path, body) => request('POST',   path, body);
export const apiPatch = (path, body) => request('PATCH',  path, body);
export const apiPut   = (path, body) => request('PUT',    path, body);
export const apiDel   = (path)       => request('DELETE', path);
