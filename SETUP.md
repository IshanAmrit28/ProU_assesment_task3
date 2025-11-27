# Employee Task Tracker - Setup Guide

This is a fullstack application with React frontend and Node.js/Express backend connected to MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```
MONGODB_URI=Your mongodb uri
PORT=5000
```

4. Seed the database with initial data:

```bash
npm run seed
```

5. Start the backend server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The backend API will be running on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:5173` (or another port if 5173 is busy)

## Features

- ✅ View all employees and their tasks
- ✅ Add, update, and delete tasks
- ✅ Filter tasks by status, employee, or priority
- ✅ Dashboard with task statistics and completion rates
- ✅ Responsive UI with modern design

## API Endpoints

### Employees

- `GET /api/employees` - Get all employees with task counts

### Tasks

- `GET /api/tasks` - Get all tasks (supports query params: status, employeeId, priority)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Dashboard

- `GET /api/dashboard` - Get dashboard summary statistics

## Troubleshooting

- **Backend won't start**: Make sure MongoDB URI is correct in `.env` file
- **Frontend can't connect to API**: Ensure backend is running on port 5000
- **No data showing**: Run `npm run seed` in the backend directory to populate initial data
