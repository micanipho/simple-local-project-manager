```typescript
import React, { useState, useEffect } from 'react';
import { CreateProjectDTO, UpdateProjectDTO, Project } from '../types';
import './Form.css'; // Reusing a general form stylesheet

interface ProjectFormProps {
  project?: Project; // For editing
  onSubmit: (data: CreateProjectDTO | UpdateProjectDTO) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel, isSubmitting }) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{project ? 'Edit Project' : 'Create New Project'}</h2>
      <div className="form-group">
        <label htmlFor="name">Project Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
```