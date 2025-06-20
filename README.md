# Arlekin 🌍

**Arlekin** is a collaborative map platform allowing users to place pins with video links on a global map. Built with **Next.js 15 (App Router)**, **PostgreSQL**, **Drizzle ORM**, **Leaflet**, and **Clerk** for authentication.

## 🎭 About

This project was created for the International Festival Arlekin.

---

## 📚 Documentation in Multiple Languages

This documentation is available in the following languages:

- [![en](https://img.shields.io/badge/lang-en-green.svg)](./README.md)
- [![bg](https://img.shields.io/badge/lang-bg-red.svg)](./README.md)

---

## ✨ Features

- 🗺️ Interactive world map using Leaflet
- 📍 Add and manage pins with metadata and video links
- 🔐 Secure authentication via Clerk
- 🐳 Fully Docker-enabled for easy deployment
- 📦 Powered by Drizzle ORM and PostgreSQL

---

## 🧭 Project Structure

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

## ⚙️ Environment Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Crea7orX/Arlekin.git
   cd Arlekin
   ```

2. **Copy and edit .env file:**

   ```bash
   cp .env.example .env
   ```

3. **Set API base URL:**

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

4. **Fill in Clerk credentials:**

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_
   CLERK_SECRET_KEY=sk_test_
   ```

5. **Configure Database:**

   ```env
   DATABASE_URL=postgresql://postgres:postgres@postgres:5432/arlekin
   ```

---

## 🐳 Running with Docker

1. **Start services:**

   ```bash
   docker-compose up -d --build
   ```

2. **Frontend:** http://localhost:3000  
   **API:** http://localhost:3000 (same app via Next.js)

If you prefer an external database, use:

```bash
docker-compose -f docker-compose-without-db.yml up -d --build
```

---

## 🧪 Local Development (No Docker)

```bash
pnpm install
pnpm dev
```

---

## 🗃️ Available Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `pnpm dev`         | Start development server            |
| `pnpm build`       | Build production version            |
| `pnpm start`       | Run production server               |
| `pnpm db:generate` | Generate database schema migrations |
| `pnpm db:push`     | Apply database schema migrations    |

---

## 🔐 Clerk Integration

- Auth middleware configured in `src/middleware.ts`
- Frontend uses `@clerk/nextjs` for auth UI
- Protected API routes under `src/app/api`  
  Ensure all Clerk environment variables are set.

---

## 🧭 Map & Pin Customization

Main code lies in:

- `src/components/map-section.tsx`
- `src/components/pin-add-dialog.tsx`
- `src/app/api/pins/*`

---

## 🧼 Cleanup

Stop and remove services:

```bash
docker-compose down
```

Also remove volumes:

```bash
docker-compose down --volumes
```

---

## 🚀 Deployment Tips

- Push images to DockerHub or another registry
- Use Docker Compose or Kubernetes in production
- Enable SSL via Traefik/Nginx
- Store env vars in a secrets manager
- Schedule regular backups of your PostgreSQL data

---

## 📄 License

This project is open-source under the GNU 3 License.
