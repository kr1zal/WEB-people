# CLAUDE.md — Проект WEB-people

## Обзор

Одностраничный персональный сайт. Next.js (App Router) + Tailwind + Framer Motion.

- **Репозиторий:** https://github.com/kr1zal/WEB-people

## Стек

- Next.js 15 (App Router) + React 19
- Tailwind CSS 4
- Framer Motion
- next-themes (light/dark)

## Структура

- `app/page.tsx` → `app/Main.tsx` — единственная страница, вся информация секциями.
- `data/siteMetadata.js` — метаданные сайта (название, описание, контакты).
- `data/headerNavLinks.ts` — навигация (якоря по секциям главной).
- `components/` — UI-кирпичи (Header, Footer, Motion, TypingEffect и т.п.).
- `content2/` — сырой материал для адаптации страницы (локально, не коммитится).

## Рабочий цикл

```bash
npm install
npm run dev        # dev-сервер на http://localhost:3000
npm run build      # prod-сборка
```

## Деплой

Сайт планируется как статика на shared-хостинг. Сборка:

```bash
rm -rf out .next
EXPORT=1 UNOPTIMIZED=1 npm run build
```

`trailingSlash: true` в `next.config.js` — обязательно для Nginx/Apache без Node.js.
