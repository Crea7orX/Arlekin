# Arlekin 🌍

**Arlekin** е платформа със споделена карта, която позволява на потребителите да поставят пинове с видео линкове на глобална карта. Изградена с **Next.js 15 (App Router)**, **PostgreSQL**, **Drizzle ORM**, **Leaflet** и **Clerk** за автентикация.

## 🎭 About

Този проект е създаден за Международния фестивал Арлекин.

---

## 📚 Документация на няколко езика

Тази документация е налична на следните езици:

- [![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)
- [![bg](https://img.shields.io/badge/lang-bg-green.svg)](./README.bg.md)

---

## ✨ Функционалности

- 🗺️ Интерактивна карта с Leaflet
- 📍 Добавяне и управление на пинове с метаданни и видео
- 🔐 Защитена автентикация чрез Clerk
- 🐳 Поддръжка с Docker за лесно деплойване
- 📦 Използва Drizzle ORM и PostgreSQL

---

## 🧭 Структура на проекта

```
Arlekin/
├── src/
├── public/
├── .env.example
├── docker-compose.yml
├── docker-compose-without-db.yml
├── Dockerfile
└── drizzle.config.ts
```

---

## ⚙️ Настройка на среда

1. **Клониране на репото:**

   ```bash
   git clone https://github.com/Crea7orX/Arlekin.git
   cd arlekin
   ```

2. **Копиране и конфигуриране на .env файла:**

   ```bash
   cp .env.example .env
   ```

3. **Задаване на API base URL-а:**

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

4. **Въвеждане на данните от Clerk:**

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_
   CLERK_SECRET_KEY=sk_test_
   ```

5. **Настройка на базата данни:**

   ```env
   DATABASE_URL=postgresql://postgres:postgres@postgres:5432/arlekin
   ```

---

## 🐳 Стартиране с Docker

1. **Стартиране на услугите:**

   ```bash
   docker-compose up -d --build
   ```

2. **Frontend:** http://localhost:3000  
   **API:** http://localhost:3000 (в Next.js приложението)

Ако предпочитате външна база данни, използвайте:

```bash
docker-compose -f docker-compose-without-db.yml up -d --build
```

---

## 🧪 Локално разработване (без Docker)

```bash
pnpm install
pnpm dev
```

---

## 🗃️ Скриптове

| Команда            | Описание                      |
| ------------------ | ----------------------------- |
| `pnpm dev`         | Стартира dev сървър           |
| `pnpm build`       | Изгражда production build     |
| `pnpm start`       | Стартира production сървър    |
| `pnpm db:generate` | Генерира база данни миграции  |
| `pnpm db:push`     | Изпълнява база данни миграции |

---

## 🔐 Интеграция с Clerk

- `src/middleware.ts` съдържа middleware за автентикация
- Frontend-а използва `@clerk/nextjs`
- Защитени API маршрути в `src/app/api`  
  Убедете се, че всички Clerk променливи са конфигурирани.

---

## 🧭 Настройки на карта и пинове

Главни файлове:

- `src/components/map-section.tsx`
- `src/components/pin-add-dialog.tsx`
- `src/app/api/pins/*`

---

## 🧼 Изчистване

За спиране и премахване на услугите:

```bash
docker-compose down
```

За премахване на обеми:

```bash
docker-compose down --volumes
```

---

## 🚀 Съвети за разгръщане

- Публикувайте Docker образи в DockerHub или друг регистър
- Използвайте Docker Compose или Kubernetes за production
- Активирайте SSL чрез Traefik/Nginx
- Съхранявайте .env променливите в secrets manager
- Настройте редовни резервни копия на PostgreSQL

---

## 📄 Лиценз

Проектът е с отворен код и се разпространява под GNU GPL-3 лиценз.
