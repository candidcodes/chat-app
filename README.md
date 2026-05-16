# ChatApp

A real-time chat application built with Node.js, Express, MongoDB, Socket.IO, and React.

---

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JSON Web Tokens (JWT)
- bcryptjs

**Frontend**
- React (Vite)
- Tailwind CSS
- Socket.IO Client
- Axios
- React Router DOM

---

## Features

- User authentication (register, login) with JWT
- User CRUD — update username/password, delete account
- Real-time group chat using Socket.IO
- Chat history saved in MongoDB
- System messages when users join or leave
- Admin panel — view all users, delete users, view stats
- Protected and admin-only routes

---

## Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── chatController.js
│   │   │   └── adminController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Message.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── chatRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── scripts/
│   │   │   └── seedAdmin.js
│   │   └── index.js
│   ├── .env
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── auth.js
    │   │   ├── user.js
    │   │   ├── chat.js
    │   │   └── admin.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Chat.jsx
    │   │   ├── Profile.jsx
    │   │   └── Admin.jsx
    │   ├── socket.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    ├── .env.example
    └── package.json
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your values in `.env`:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5000
```

---

### 3. Seed Admin User

```bash
npm run seed
```

This creates a default admin account:
```
email:    admin@test.com
password: admin123
```

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your values in `.env`:

```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get token |
| GET | `/api/auth/me` | Protected | Get current user profile |

### User
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| PUT | `/api/users/update` | Protected | Update username or password |
| DELETE | `/api/users/delete` | Protected | Delete own account |

### Chat
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/chat/history` | Protected | Get all chat messages |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/users` | Admin only | Get all users |
| DELETE | `/api/admin/users/:id` | Admin only | Delete any user |
| GET | `/api/admin/stats` | Admin only | Get total users and messages |

---

## Socket.IO Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `user_join` | Client → Server | Emitted when a user joins the chat |
| `user_join` | Server → Client | Broadcasts join message to all users |
| `send_message` | Client → Server | Emitted when a user sends a message |
| `receive_message` | Server → Client | Broadcasts message to all users |
| `user_left` | Server → Client | Broadcasts when a user disconnects |

---

## Pages

| Page | Route | Access |
|------|-------|--------|
| Register | `/register` | Guest only |
| Login | `/login` | Guest only |
| Chat | `/chat` | Logged in users |
| Profile | `/profile` | Logged in users |
| Admin | `/admin` | Admin only |

---

## Environment Variables

### Backend `.env.example`
```bash
PORT=
MONGO_URI=
JWT_SECRET=
```

### Frontend `.env.example`
```bash
VITE_API_URL=
VITE_SOCKET_URL=
```

---

## Default Admin Credentials

After running the seed script:

```
Email:    admin@test.com
Password: admin123
```

> It is recommended to change the admin password after first login.
