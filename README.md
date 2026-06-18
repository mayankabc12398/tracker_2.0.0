# 🌊 LifeFlow — Premium Life Management

A modern, glassmorphic life-management SaaS that unifies **habit tracking, goals, expenses, learning, analytics and dashboards** into one seamless experience. Built with React 18 (JavaScript/JSX) + Tailwind + Framer Motion on the front, Express + MongoDB on the back.

> The frontend runs **fully standalone** with realistic seeded data persisted to `localStorage` — no backend or database required to demo it. The Express/MongoDB API is included for cloud sync and multi-device use.

---

## ✨ Features

| Module | Highlights |
| --- | --- |
| **Dashboard** | Today's completion %, streak, productivity ring, weekly consistency, goal & learning widgets, upcoming tasks |
| **Daily Routine** | Morning/Work/Evening sections, add/edit/delete habits, streaks, GitHub-style heatmap, daily/weekly/monthly stats |
| **Goals** | Fitness / Career / Finance / Personal Growth, milestones, deadlines, auto-calculated progress, achievement cards |
| **Expenses** | Income & savings tracking, category pie + 6-month bar charts, search/filter, pagination, **CSV export** |
| **Learning** | HTML→CSS→JS→React→Node→TS subjects, rich topic pages (overview, syntax, examples, notes, interview Q&A, resources), **version history & changelog**, personal notes |
| **Analytics** | Daily/Weekly/Monthly/Yearly toggle, productivity / streak / goal / learning / expense trends (Recharts) |
| **Calendar** | Month grid + 52-week heatmap, weekly & monthly consistency |
| **Profile** | Avatar, achievement badges, edit profile, **export/backup & restore** |
| **Settings** | Dark/Light theme, accent color, language, timezone, currency, notification toggles, data reset |

UX polish: glassmorphism cards, 20–24px radii, gradient accents, Framer Motion transitions, loading skeletons, error boundary, toast notifications, fully mobile-responsive sidebar.

---

## 🛠 Tech Stack

**Frontend** — React 18 (JavaScript + JSX), Vite, Tailwind CSS, Framer Motion, Zustand (persisted), TanStack React Query, Recharts, React Router, lucide-react.

**Backend** — Node.js (ES modules), Express, MongoDB + Mongoose, JWT auth, Google OAuth, Zod validation, Helmet, rate-limiting, bcrypt.

---

## 🚀 Getting Started

### Frontend (zero-config demo)
```bash
npm install
npm run dev          # → http://localhost:5173
```
That's it — the app boots with seeded demo data. `npm run build` for production.

### Backend (optional, for cloud sync)
```bash
cd server
cp .env.example .env          # set MONGODB_URI + JWT_SECRET
npm install
npm run seed                  # creates demo@lifeflow.app / demo1234
npm run dev                   # → http://localhost:4000/api/health
```
The Vite dev server proxies `/api` → `http://localhost:4000`.

---

## 📁 Folder Structure

```
tracker_2.0.0/
├── src/                          # Frontend
│   ├── api/                      # fetch client + React Query hooks
│   ├── components/
│   │   ├── ui/                   # Card, Button, Modal, Input, Toast, Progress, Badge, Skeleton…
│   │   ├── layout/               # Sidebar, Topbar, AppLayout
│   │   ├── Heatmap.jsx  StatCard.jsx  PageHeader.jsx  ErrorBoundary.jsx
│   ├── pages/                    # Dashboard, Habits, Goals, Expenses, Learning, TopicDetail,
│   │                             #   Analytics, Calendar, Profile, Settings
│   ├── store/                    # Zustand store + seed data
│   ├── hooks/                    # useAnalytics, useTheme
│   ├── lib/                      # utils, csv export
│   ├── config/                   # nav config
│   └── types/                    # shared domain types
└── server/                       # Backend
    └── src/
        ├── config/               # env, db
        ├── models/               # User, Habit, Goal, Transaction, Learning, Note, Notification
        ├── controllers/          # auth, analytics, profile, crud factory
        ├── middleware/           # auth (JWT), error handling
        ├── routes/               # auth, habits, goals, expenses, learning, analytics, profile, notifications
        ├── app.js  server.js  seed.js
```

---

## 🗄 Database Schema (MongoDB)

- **User** — name, email, password (bcrypt), googleId, avatar, bio, embedded `settings` (theme/language/timezone/currency/accent/notifications)
- **Habit** — user, name, icon, section, color, `completions: Map<YYYY-MM-DD, boolean>`
- **Goal** — user, title, category, progress, deadline, embedded `milestones[]`
- **Transaction** — user, type (expense/income), title, amount, category, date, note
- **LearningCategory** — user, name, icon, color
- **LearningTopic** — user, category, title, overview, syntax, examples, bestPractices, notes, interviewQuestions[], resources[], tags[], related[], progress, embedded `history[]` (version changelog)
- **Note** — user, topic, title, body, pinned
- **Notification** — user, type, title, message, read

All resource collections are indexed on `user` for fast owner-scoped queries.

---

## 🔌 REST API

```
Auth
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/google           Google ID-token login
  GET    /api/auth/me

Habits     /api/habits     GET POST · /:id GET PATCH DELETE · /:id/toggle POST
Goals      /api/goals      GET POST · /:id GET PATCH DELETE
Expenses   /api/expenses   GET POST · /:id GET PATCH DELETE   (?q= &category= &page= &limit=)
Learning   /api/learning   /categories · /topics (PATCH appends version history)
Analytics  /api/analytics  /summary · /habits?days= · /expenses
Profile    /api/profile    PATCH · /settings PATCH
Notifs     /api/notifications  GET POST · /:id DELETE · /read-all POST
```

All non-auth routes require `Authorization: Bearer <token>`. List endpoints support pagination, `?q=` search, and category/section filtering via a shared CRUD factory.

---

## 🧱 Architecture Notes

- **Clean separation** — routes → controllers → models; reusable `crudFactory` removes boilerplate across owner-scoped resources.
- **Local-first frontend** — Zustand store (persisted) is the source of truth for instant demoing; `src/api/` provides the React Query layer to switch to the server with minimal changes.
- **Plain JavaScript everywhere** — React + JSX on the client, ES-module Node on the server; no build step needed for the backend.
- **Resilience** — React error boundary, async error middleware, Zod request validation, JWT + bcrypt + Helmet + rate limiting.
- **Performance** — route-level code splitting (`React.lazy`), memoized analytics selectors, indexed Mongo queries.

---

Made with 💜 — Indigo `#6366F1` · Purple `#8B5CF6` · Green `#22C55E` · Amber `#F59E0B`
