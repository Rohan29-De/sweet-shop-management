# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A full-stack Sweet Shop Management System with NestJS backend and React frontend. Built with TDD principles, featuring JWT authentication, role-based access control, and atomic transaction handling for inventory management.

**Tech Stack:**
- Backend: NestJS, TypeScript, PostgreSQL, Prisma ORM, JWT + BCrypt
- Frontend: React (Vite), TypeScript, Tailwind CSS, React Router, Axios

## Development Commands

### Backend (from `/backend`)

**Start & Development:**
```bash
npm run start:dev      # Start with hot-reload (default port 3000)
npm run start:prod     # Production mode
npm run build          # Build for production
```

**Testing:**
```bash
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests (primary testing approach)
npm run test:watch     # Watch mode for unit tests
npm run test:cov       # Coverage report
```

**Code Quality:**
```bash
npm run lint           # ESLint with auto-fix
npm run format         # Prettier formatting
```

**Database:**
```bash
npx prisma db push     # Push schema changes to database
npx prisma migrate dev # Create and apply migration
npx prisma studio      # Open Prisma Studio GUI
npx prisma generate    # Regenerate Prisma Client
```

### Frontend (from `/frontend`)

```bash
npm run dev            # Start dev server (default port 5173)
npm run build          # Build for production (TypeScript + Vite)
npm run preview        # Preview production build
npm run lint           # ESLint
```

## Architecture

### Backend Architecture

**Module Structure:**
- `PrismaModule`: Database client (singleton service)
- `AuthModule`: JWT authentication, bcrypt password hashing, role guards
- `SweetsModule`: CRUD operations, inventory management with atomic transactions

**Authentication Flow:**
- JWT-based authentication with `JwtAuthGuard` protecting routes
- Role-based access control via `RolesGuard` (USER, ADMIN)
- Guards are applied at controller method level using decorators: `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles(UserRole.ADMIN)`
- Password hashing with bcrypt (10 rounds)

**Transaction Handling:**
- Purchase and restock operations use Prisma `$transaction()` to prevent race conditions
- Example: `purchase()` checks stock availability and decrements quantity atomically

**API Prefix:**
- All routes are prefixed with `/api` (configured in main.ts)
- CORS enabled globally

**Validation:**
- Global ValidationPipe with `whitelist: true` and `transform: true`
- DTOs use class-validator decorators (e.g., `@IsEmail()`, `@MinLength(6)`)

### Frontend Architecture

**Routing Structure:**
- `/login` - Public
- `/register` - Public  
- `/` - Dashboard (authenticated users)
- `/admin` - Admin Panel (authenticated users)

**State Management:**
- `AuthContext` provides global auth state (user, token, login, logout)
- Token and user stored in localStorage
- Axios instance (`api`) configured with base URL and auto-injected Bearer token

**Private Routes:**
- `PrivateRoute` component checks auth state and redirects to login if unauthenticated
- Loading state prevents flash of unauthorized content

**API Integration:**
- Centralized axios instance at `context/AuthContext.tsx`
- Base URL: `http://localhost:3000`
- Authorization header automatically set on login

### Database Schema (Prisma)

**User Model:**
- `id` (UUID), `email` (unique), `password` (hashed), `role` (default: USER)

**Sweet Model:**
- `id` (UUID), `name`, `category`, `price` (Float), `quantity` (Int)

## Project Conventions

### Testing Approach
- TDD used for backend development
- E2E tests in `backend/test/` are the primary test suite
- Test files: `auth.e2e-spec.ts`, `sweets.e2e-spec.ts`, `app.e2e-spec.ts`

### Environment Configuration
- Backend `.env` requires: `DATABASE_URL`, `JWT_SECRET`
- Frontend hardcoded to `http://localhost:3000` (see `AuthContext.tsx:4`)

### Role-Based Permissions
- **Admin-only operations:** Create, Update, Delete sweets, Restock inventory
- **Authenticated operations:** View sweets, Search, Purchase (decrements stock)
- **Public operations:** Register, Login

### Code Organization
- DTOs in dedicated `dto` folders within each module
- Guards defined in `auth` module but used across controllers
- Prisma service injected via dependency injection
