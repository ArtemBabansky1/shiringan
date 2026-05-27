import { apiGet, apiPatch, apiPut, apiDel } from './client.js';

export const fetchProgress  = ()                          => apiGet('/progress');
export const patchProgress  = (dayIdx, taskKey, done)     => apiPatch('/progress', { dayIdx, taskKey, done });
export const bulkProgress   = (completed)                 => apiPut('/progress/bulk', { completed });
export const resetProgress  = ()                          => apiDel('/progress');
