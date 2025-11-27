export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar?: string;
  totalTasks: number;
  completedTasks: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  employeeId: string;
  employeeName: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: Task['status'];
  priority: Task['priority'];
  employeeId: string;
  dueDate: string;
}