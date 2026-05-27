// Дефолты (обратная совместимость — старые импорты продолжают работать)
export const START_DATE = new Date(2026, 4, 25, 0, 0, 0);
export const TOTAL_DAYS = 100;
export const STORAGE_KEY = 'sharingan100_v2';

export function dateForDay(idx) {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + idx);
  return d;
}

export function todayIndex() {
  const now = new Date();
  const ms = now - START_DATE;
  return Math.floor(ms / 86400000);
}

export function formatDate(d) {
  const m = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateShort(d) {
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
}

export const WEEKDAY_RU = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
export const WEEKDAY_RU_SHORT = ['Вск','Пнд','Вт','Ср','Чт','Пт','Сб'];

// Фабрика для пользовательских настроек
export function makeDateUtils(startDateStr, totalDays) {
  const start = startDateStr ? new Date(startDateStr + 'T00:00:00') : START_DATE;
  const total = totalDays || TOTAL_DAYS;

  return {
    START_DATE: start,
    TOTAL_DAYS: total,
    dateForDay(idx) {
      const d = new Date(start);
      d.setDate(d.getDate() + idx);
      return d;
    },
    todayIndex() {
      const ms = new Date() - start;
      return Math.floor(ms / 86400000);
    },
    formatDateShort(d) {
      return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
    },
  };
}
