# Quick start — Sweet Shop Management

This project contains a NestJS backend (`/backend`) and a React (Vite) frontend (`/frontend`). Use the instructions below to run it locally.

Prerequisites
- Node.js >= 18
- npm
- PostgreSQL (create a database `sweetshop` or update `DATABASE_URL`)

Backend setup

1. Copy env example and update values:

```bash
cp backend/.env.example backend/.env
# edit backend/.env to point to your DB and set a JWT_SECRET
```

2. Install dependencies (already included in the repo; run if needed):

```bash
cd backend
npm install
```

3. Generate Prisma client and push schema:

```bash
npx prisma generate
npx prisma db push
```

4. Run the backend (development):

```bash
npm run start:dev
```

5. Run tests:

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

Frontend setup

1. Install and run:

```bash
cd frontend
npm install
npm run dev
```

2. Open the app at `http://localhost:5173` (frontend) and the API is at `http://localhost:3000/api`.

Notes and troubleshooting
- If you change Prisma schema, run `npx prisma migrate dev` (for migrations) or `npx prisma db push` (fast). 
- The default dev JWT secret is in `backend/.env.example` — change it for production.
- If you see DB connection errors, verify `DATABASE_URL` and Postgres service.

Files added for developer convenience
- `/.env.example` — repository-level example
- `/backend/.env.example` — backend env example
- `QUICK_START.md` — this file

If you'd like, I can:
- run the backend tests now and report results,
- add a `Makefile` or npm scripts to simplify local startup,
- or prepare a `docker-compose.yml` for an easy local Postgres + app startup.
# Quick Start Guide - Sweet Shop Management System

## Prerequisites
- Node.js 18+ and npm installed
- PostgreSQL 12+ running locally
- Two terminal windows

## 1. Database Setup

Make sure PostgreSQL is running with a database named `sweetshop`:

```bash
# Create database (if using psql)
createdb sweetshop

# Or update the DATABASE_URL in backend/.env to match your PostgreSQL setup
```

## 2. Backend - Terminal 1

```bash
cd backend

# Push database schema
npx prisma db push

# Start development server (watch mode with hot reload)
npm run start:dev
```

✅ Backend running at: `http://localhost:3000`
✅ API endpoints at: `http://localhost:3000/api`

## 3. Frontend - Terminal 2

```bash
cd frontend

# Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

## 4. Use the Application

1. Open `http://localhost:5173` in your browser
2. Click "Register" to create a new account
   - For admin features, select "Admin" role during registration
3. Login with your credentials
4. Browse the sweet shop dashboard
5. If you're an admin, click "Admin Panel" to manage inventory

## Common Commands

### Backend
```bash
cd backend

npm run start:dev      # Development mode (recommended)
npm run start:prod     # Production mode
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run lint           # Fix linting issues
npm run format         # Format code with Prettier
npm run build          # Build for production
```

### Frontend
```bash
cd frontend

npm run dev            # Development mode (recommended)
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Check linting
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running: `psql -U postgres`
- Check `DATABASE_URL` in `backend/.env`
- Run `npx prisma db push` to create schema

### Port Already in Use
- Backend (3000): `lsof -i :3000 | kill -9 <PID>`
- Frontend (5173): `lsof -i :5173 | kill -9 <PID>`

### Clear All Data
```bash
cd backend
npx prisma db push --force-reset  # ⚠️ This deletes all data
```

## Test Users

After running `npx prisma db push`, you can:
1. Register new users through the UI
2. Create admin user during registration and select "Admin" role

## Project Features

✅ User registration and login with JWT authentication
✅ Product browsing with search functionality  
✅ Purchase sweet items with stock validation
✅ Admin panel for inventory management
✅ Role-based access control (USER/ADMIN)
✅ Atomic transactions for purchase/restock operations
✅ Responsive design for mobile and desktop

## Need Help?

See `PROJECT_COMPLETION.md` for detailed documentation on:
- Complete project structure
- API endpoint documentation
- Deployment instructions
- Security considerations
- Testing strategies

---

**Ready to go!** 🎉 Both servers should now be running and the app is ready to use.
