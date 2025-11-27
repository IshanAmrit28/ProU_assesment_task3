const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Task = require('../models/Task');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    
    // Calculate task counts for each employee
    const employeesWithTasks = await Promise.all(
      employees.map(async (employee) => {
        const tasks = await Task.find({ employeeId: employee._id });
        const completedTasks = tasks.filter(task => task.status === 'completed');
        
        return {
          id: employee._id.toString(),
          name: employee.name,
          email: employee.email,
          department: employee.department,
          role: employee.role,
          avatar: employee.avatar || undefined,
          totalTasks: tasks.length,
          completedTasks: completedTasks.length
        };
      })
    );
    
    res.json(employeesWithTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

