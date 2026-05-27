import { apiGet, apiPost } from './client.js';

export const getMe       = ()                   => apiGet('/auth/me');
export const register    = (email, password)    => apiPost('/auth/register', { email, password });
export const login       = (email, password)    => apiPost('/auth/login',    { email, password });
export const logout      = ()                   => apiPost('/auth/logout');
