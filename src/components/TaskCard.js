// src/components/TaskCard.js
import React from 'react';

const TaskCard = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className="task-item">
      <span
        className="task-text"
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
        onClick={() => toggleTask(task.id)}
      >
        {task.text}
      </span>
      <div className="task-actions">
        <button onClick={() => toggleTask(task.id)}>
          {task.completed ? 'Undo' : 'Done'}
        </button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskCard;
