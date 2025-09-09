// src/components/TaskForm.js
import React from 'react';

const TaskForm = ({ newTask, setNewTask, addTask }) => {
  return (
    <form onSubmit={addTask} className="task-form">
      <input
        className="task-input"
        type="text"
        placeholder="Enter a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="task-button" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
