import { apiGet, apiPost, initCsrf } from './client.js';

export const getMe = () => apiGet('/auth/me');
export const logout = () => apiPost('/auth/logout');

export async function login(email, password) {
  await initCsrf();
  return apiPost('/auth/login', { email, password });
}

export async function register(email, password) {
  await initCsrf();
  return apiPost('/auth/register', { email, password });
}
