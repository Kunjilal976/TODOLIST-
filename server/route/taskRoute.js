const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

// Define routes
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.delete('/:id', taskController.deleteTaskById);
router.put('/:id', taskController.updateTaskById);

module.exports = router;
