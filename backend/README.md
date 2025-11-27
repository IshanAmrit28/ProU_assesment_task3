# Employee Task Tracker - Backend API

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with:
```
MONGODB_URI=mongodb+srv://root:ishan1234@cluster28.0nvbvkb.mongodb.net/?appName=cluster28
PORT=5000
```

3. Seed the database with initial data (optional but recommended):
```bash
npm run seed
```

4. Run the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

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

## Database Models

### Employee
- name, email, department, role, avatar (optional)
- totalTasks, completedTasks (calculated)

### Task
- title, description, status, priority
- employeeId, employeeName, dueDate
- createdAt, updatedAt

