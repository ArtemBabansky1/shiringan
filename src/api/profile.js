import { apiGet, apiPatch } from './client.js';

export const fetchProfile = ()      => apiGet('/profile');
export const saveProfile  = (data)  => apiPatch('/profile', data);
