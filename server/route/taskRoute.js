const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

// Define routes
router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.delete('/:id', taskController.deleteTaskById);
router.put('/:id', taskController.updateTaskById);

module.exports = router;
