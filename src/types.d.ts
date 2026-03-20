/**
 * Global type definitions for the Project Manager application.
 */

/**
 * Represents the status of a task.
 */
export type TaskStatus = 'todo' | 'in-progress' | 'done';

/**
 * Represents a Project entity.
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}

/**
 * Represents a Task entity.
 */
export interface Task {
  id: string;
  projectId: string; // Foreign key linking to Project
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}