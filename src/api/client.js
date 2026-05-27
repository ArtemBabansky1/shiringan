const BASE = '/api';

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };

  // Fallback для Electron: токен в localStorage если cookies не работают
  const token = localStorage.getItem('auth_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { data: null, error: data.error || `HTTP ${res.status}` };
  }
  return { data, error: null };
}

export const apiGet  = (path)        => request('GET',    path);
export const apiPost = (path, body)  => request('POST',   path, body);
export const apiPatch = (path, body) => request('PATCH',  path, body);
export const apiPut  = (path, body)  => request('PUT',    path, body);
export const apiDel  = (path)        => request('DELETE', path);
