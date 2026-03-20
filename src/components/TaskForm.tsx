```typescript
import React, { useState, useEffect } from 'react';
import { CreateTaskDTO, UpdateTaskDTO, Task, TaskStatus } from '../types';
import './Form.css'; // Reusing a general form stylesheet

interface TaskFormProps {
  task?: Task; // For editing
  onSubmit: (data: CreateTaskDTO | UpdateTaskDTO) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, isSubmitting }) => {
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
      <div className="form-group">
        <label htmlFor="task-name">Task Name:</label>
        <input
          type="text"
          id="task-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-description">Description:</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="task-status">Status:</label>
        <select
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          disabled={isSubmitting}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
```