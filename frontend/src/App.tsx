import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import EmployeeList from './components/EmployeeList';
import TaskModal from './components/TaskModal';
import { Task, TaskFormData, Employee } from './types';
import { employeesAPI, tasksAPI } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [employeesData, tasksData] = await Promise.all([
          employeesAPI.getAll(),
          tasksAPI.getAll()
        ]);
        setEmployees(employeesData);
        setTasks(tasksData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (taskData: TaskFormData) => {
    try {
      if (editingTask) {
        // Update existing task
        const updatedTask = await tasksAPI.update(editingTask.id, taskData);
        setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
      } else {
        // Create new task
        const newTask = await tasksAPI.create(taskData);
        setTasks([...tasks, newTask]);
      }
      
      // Refresh employees to update task counts
      const updatedEmployees = await employeesAPI.getAll();
      setEmployees(updatedEmployees);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
      console.error('Error saving task:', err);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
        
        // Refresh employees to update task counts
        const updatedEmployees = await employeesAPI.getAll();
        setEmployees(updatedEmployees);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete task');
        console.error('Error deleting task:', err);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard employees={employees} tasks={tasks} />;
      case 'tasks':
        return (
          <TaskList 
            tasks={tasks} 
            employees={employees}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'employees':
        return <EmployeeList employees={employees} tasks={tasks} />;
      default:
        return <Dashboard employees={employees} tasks={tasks} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onCreateTask={handleCreateTask}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        employees={employees}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;