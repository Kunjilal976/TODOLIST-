const TaskModel = require('../model/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const taskData = req.body;
  const task = new TaskModel(taskData);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskById = async (req, res) => {
  const id = req.params.id;
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { title, description, dueDate, status },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  deleteTaskById,
  updateTaskById,
};
