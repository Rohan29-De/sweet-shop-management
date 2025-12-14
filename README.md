# Sweet Shop Management System

A full-stack application for managing a sweet shop inventory and sales, built with NestJS and React.

## Tech Stack

**Backend:**
- NestJS (Node.js framework)
- TypeScript
- PostgreSQL (Database)
- Prisma (ORM)
- JWT Authentication & BCrypt
- Jest (Testing)

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS (Styling)
- Axios (HTTP Client)
- React Router

## Features

- **Authentication**: Secure Login/Register with JWT. Role-based access (USER, ADMIN).
- **Dashboard**: Browse sweets, search, and purchase items. Matches "Nest Mart" aesthetic.
- **Admin Panel**: Add, Update, Delete sweets and view inventory.
- **Inventory Management**: Atomic transactions for purchases to prevent overselling.

## API Documentation

| Method | Endpoint | Description | Access |
|Or---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/sweets` | Get all sweets (search via ?q=) | Authenticated |
| POST | `/api/sweets` | Create sweet | Admin |
| PATCH | `/api/sweets/:id` | Update sweet | Admin |
| DELETE | `/api/sweets/:id` | Delete sweet | Admin |
| POST | `/api/sweets/:id/purchase` | Buy a sweet (decrease stock) | Authenticated |

## Setup & Run

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### Installation

1.  **Clone the repo**
2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Update .env with your DATABASE_URL
    npx prisma db push
    npm run start:dev
    ```
3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## TDD Approach
The backend core logic (Auth, Sweets, Inventory) was built using TDD principles. 
- E2E tests are located in `backend/test/`.
- Run tests with `npm run test:e2e` in the backend directory.

## AI Usage
This project was co-authored with AI (Google DeepMind) to accelerate development while ensuring clean architecture and best practices.
