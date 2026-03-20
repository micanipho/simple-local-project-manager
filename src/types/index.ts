```typescript
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

// DTOs for creation/update
export type CreateProjectDTO = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectDTO = Partial<Omit<Project, 'id' | 'createdAt'>>;

export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskDTO = Partial<Omit<Task, 'id' | 'createdAt' | 'projectId'>>;
```