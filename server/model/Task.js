const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'], 
    default: 'pending', 
  },
  dueDate: {
    type: Date,
    required: true,
  }
  
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
