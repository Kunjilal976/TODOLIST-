import React, { useState } from 'react';
import axios from 'axios';

function CreateTask({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status, dueDate };


    try {
      const response = await axios.post('http://localhost:3000/tasks', newTask, {
        headers: { 'Content-Type': 'application/json' }
      });
      onTaskAdded(response.data);  // Call the parent callback to add the task to the list
      setTitle('');
      setDescription('');
      setStatus('pending');
      setDueDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="add-task">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
