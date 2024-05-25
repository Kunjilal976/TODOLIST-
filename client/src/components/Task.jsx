// Task.js
import React, { useState } from 'react';
import './style.css';

function Task({ task, completeTask, removeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task._id, { ...task, title: newTitle, description: newDescription });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task" style={{ textDecoration: task.completed ? "line-through" : "" }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <p>{task.description}</p>
        </>
      )}
      <button style={{ background: "red" }} onClick={() => removeTask(task._id)}>x</button>
      <button onClick={() => completeTask(task._id)}>Complete</button>
      <button onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}

export default Task;
