# Minbar — архив хутб

Современный веб-архив пятничных хутб с удобным прослушиванием, фильтрацией и загрузкой аудиозаписей с компьютера или телефона.

## Возможности

- архив хутб с фильтрами по языку, городу, мечети, имаму и дате;
- отдельные страницы аудиозаписей;
- постоянный аудиоплеер;
- адаптивная загрузка MP3 с мобильных устройств;
- статистика архива;
- счётчик до Рамадана;
- ссылки на Telegram-бота и автора проекта.

## Технологии

- React 19;
- Next.js 16 / Vinext;
- TypeScript;
- Supabase;
- Vite;
- Cloudflare Workers-compatible runtime.

## Локальный запуск

Требуется Node.js 22.13 или новее.

```bash
npm install
npm run dev
```

После запуска сайт будет доступен по адресу, который покажет Vite.

## Переменные окружения

Создайте `.env.local` и добавьте подключение к Supabase:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Также поддерживаются имена `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Проверка проекта

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Telegram

- Бот: [@minbar_archive_bot](https://t.me/minbar_archive_bot)
- По сотрудничеству: [@hwee1r](https://t.me/hwee1r)

## Лицензия

Исходный код проекта опубликован для развития Minbar. Перед повторным использованием материалов и аудиозаписей согласуйте условия с владельцем проекта.
