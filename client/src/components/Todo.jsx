import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import AddTask from './CreateTask';

function Todo() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        console.log('Fetched tasks:', response.data); // Log fetched tasks
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('Fetched tasks is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', task);
      console.log('Added task:', response.data); // Log added task
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const completeTask = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
      console.log('Completed task:', response.data); // Log completed task
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      console.log('Deleted task ID:', id); // Log deleted task ID
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
      console.log('Edited task:', response.data); // Log edited task
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div className="todo-container">
      <div className="header">TODO - ITEMS</div>
      <AddTask onTaskAdded={addTask} />
      <div className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Task
              key={task._id}
              task={task}
              index={index}
              completeTask={completeTask}
              removeTask={removeTask}
              editTask={editTask}
            />
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
}

export default Todo;
