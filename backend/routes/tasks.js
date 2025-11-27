const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Employee = require('../models/Employee');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { status, employeeId, priority } = req.query;
    
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (employeeId && employeeId !== 'all') {
      query.employeeId = employeeId;
    }
    if (priority && priority !== 'all') {
      query.priority = priority;
    }
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    const formattedTasks = tasks.map(task => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      employeeId: task.employeeId.toString(),
      employeeName: task.employeeName,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }));
    
    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      employeeId: task.employeeId.toString(),
      employeeName: task.employeeName,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, priority, employeeId, dueDate } = req.body;
    
    // Validate required fields
    if (!title || !employeeId || !dueDate) {
      return res.status(400).json({ error: 'Title, employeeId, and dueDate are required' });
    }
    
    // Get employee to get employee name
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const task = new Task({
      title,
      description: description || '',
      status: status || 'pending',
      priority: priority || 'medium',
      employeeId,
      employeeName: employee.name,
      dueDate,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    });
    
    const savedTask = await task.save();
    
    res.status(201).json({
      id: savedTask._id.toString(),
      title: savedTask.title,
      description: savedTask.description,
      status: savedTask.status,
      priority: savedTask.priority,
      employeeId: savedTask.employeeId.toString(),
      employeeName: savedTask.employeeName,
      dueDate: savedTask.dueDate,
      createdAt: savedTask.createdAt,
      updatedAt: savedTask.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, priority, employeeId, dueDate } = req.body;
    
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // If employeeId changed, get new employee name
    let employeeName = task.employeeName;
    if (employeeId && employeeId !== task.employeeId.toString()) {
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      employeeName = employee.name;
    }
    
    // Update task fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (employeeId) {
      task.employeeId = employeeId;
      task.employeeName = employeeName;
    }
    if (dueDate) task.dueDate = dueDate;
    task.updatedAt = new Date().toISOString().split('T')[0];
    
    const updatedTask = await task.save();
    
    res.json({
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      priority: updatedTask.priority,
      employeeId: updatedTask.employeeId.toString(),
      employeeName: updatedTask.employeeName,
      dueDate: updatedTask.dueDate,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

