# 写輪眼 · 100 Дней Шарингана

Трекер 100-дневного марафона в эстетике аниме Naruto.

## Стек

- **React 18** + Vite
- **GSAP 3** — анимации полосок характеристик
- **Framer Motion** — переходы, мобильные свайпы
- **tsParticles** — летящие частицы фона
- **Tone.js** — синтезированные звуки
- **lucide-react** — иконки

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173)

## Сборка

```bash
npm run build
```

## Структура

```
public/
  fonts/        — Vela Sans GX (variable font)
  characters/   — фотографии персонажей (добавляются вручную)
src/
  components/   — все UI-компоненты
  context/      — глобальное состояние (AppContext)
  data/         — персонажи, цитаты, стадии, задачи
  hooks/        — кастомные хуки
  lib/          — логика (statsEngine, sounds, dates)
  styles/       — глобальные CSS
```

## Фотографии персонажей

Скачай 20 фотографий и положи в `public/characters/`. Список и инструкция — в [public/characters/README.md](public/characters/README.md).

## Данные

Прогресс сохраняется в `localStorage`. Используй кнопки «Экспорт» / «Импорт» для резервного копирования.

## Дата старта

25 мая 2026 — 1 сентября 2026.
