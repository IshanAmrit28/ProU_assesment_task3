import { Mail, Briefcase, CheckCircle } from 'lucide-react';
import { Employee, Task } from '../types';

interface EmployeeListProps {
  employees: Employee[];
  tasks: Task[];
}

export default function EmployeeList({ employees, tasks }: EmployeeListProps) {
  const getEmployeeTasks = (employeeId: string) => {
    return tasks.filter(task => task.employeeId === employeeId);
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-green-100 text-green-800',
      'HR': 'bg-yellow-100 text-yellow-800',
      'Sales': 'bg-red-100 text-red-800',
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Employees</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => {
            const employeeTasks = getEmployeeTasks(employee.id);
            const completionRate = employee.totalTasks > 0 
              ? Math.round((employee.completedTasks / employee.totalTasks) * 100) 
              : 0;

            return (
              <div key={employee.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Employee Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-lg">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.role}</p>
                    </div>
                  </div>

                  {/* Employee Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>{employee.department}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDepartmentColor(employee.department)}`}>
                        {employee.department}
                      </span>
                    </div>
                  </div>

                  {/* Task Statistics */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Task Progress</span>
                      <span className="text-sm font-medium text-gray-900">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>{employee.completedTasks}/{employee.totalTasks} completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Tasks */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Tasks</h4>
                    <div className="space-y-1">
                      {employeeTasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            task.status === 'completed' ? 'bg-green-400' :
                            task.status === 'in-progress' ? 'bg-yellow-400' :
                            task.status === 'pending' ? 'bg-gray-400' : 'bg-red-400'
                          }`}></div>
                          <span className="text-xs text-gray-600 truncate">{task.title}</span>
                        </div>
                      ))}
                      {employeeTasks.length === 0 && (
                        <p className="text-xs text-gray-500">No tasks assigned</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}