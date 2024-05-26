const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

// Define routes
router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getTaskById);
router.delete('/tasks/:id', taskController.deleteTaskById);
router.put('/tasks/:id', taskController.updateTaskById);

module.exports = router;
