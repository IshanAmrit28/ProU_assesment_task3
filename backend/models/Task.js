const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
});

module.exports = mongoose.model('Task', taskSchema);

