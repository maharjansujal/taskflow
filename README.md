# TaskFlow

TaskFlow is a responsive, optimized task management application built with a TypeScript-first monorepo architecture. It features secure JWT-based authentication, centralized state management, automated API interception, and a scalable folder structure.

## 🚀 Tech Stack

### Client

- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **API Client:** Axios (with Interceptors)

### Server

- **Runtime:** Node.js (Express)
- **Language:** TypeScript (run via tsx)
- **Database:** PostgreSQL (pg)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## 🛠️ Features & Assignment Implementation

- **JWT Token Authentication:** Secure user registration and login flows. Tokens are passed via headers and managed securely across protected client routes.
- **State Management:** Implemented via a centralized `AuthContext` to maintain authentication states across the application seamlessly.
- **API Interceptors:** Axios interceptors handle automated authorization header injection and centralized global error parsing.
- **Performance Optimization:** Leverages React optimization hooks (`useMemo`, `useCallback`) to prevent redundant component re-renders during state mutations.
- **Clean & Scalable Folder Structure:** Features a strict separation of concerns with dedicated layers for components, custom hooks, contexts, routes, controllers, and database services.

---

## 📁 Project Structure

```text
taskflow/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── api/            # Axios instance and interceptor setup
│   │   ├── components/     # Atomic and reusable UI components
│   │   ├── context/        # Global state (AuthContext)
│   │   ├── hooks/          # Custom hooks (useAuth, useTasks)
│   │   ├── pages/          # View components / layouts
│   │   └── utils/          # Pure helper functions
└── server/                 # Backend Application
    ├── scripts/            # DB migrations
    └── src/
        ├── controllers/    # Request/response lifecycles
        ├── db/             # Connection and schema configurations
        ├── middleware/     # Auth guarding middleware
        ├── routes/         # Express endpoint definitions
        └── services/       # Database query orchestration
```

## Server Setup

1. Navigate to the server folder

```bash
cd server
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file based on your needs
   0

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/taskflow
JWT_SECRET=your_super_secure_jwt_secret
```

4. Run the migration

```bash
npm run migrate
```

5. Start the server

```bash
npm run dev
```

## Client Setup

1. Open a new terminal window and navigate to client folder.

```bash
cd client
```

2. Install dependencies

```bash
npm install
```

3. Import `tailwindcss` in index.css or App.css:

```css
@import "tailwindcss";
```

4. Run the project

```bash
npm run dev
```
