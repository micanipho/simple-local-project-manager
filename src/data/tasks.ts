import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../types';
import { TASKS_STORAGE_KEY } from '../constants';
import { loadData, saveData } from '../utils/localStorage';

/**
 * Initializes Local Storage with some dummy task data if it's empty.
 * This also assumes some dummy projects exist for linking.
 */
function initializeTasks() {
  const tasks = loadData<Task>(TASKS_STORAGE_KEY);
  if (tasks.length === 0) {
    const now = new Date().toISOString();
    // Assuming project IDs from src/data/projects.ts dummy data
    // In a real app, you'd link to actual project IDs.
    const dummyProjectId1 = 'd7d2a5c1-1a9f-4e0b-8d1e-2c3f4a5b6c7d'; // Example ID, replace if needed
    const dummyProjectId2 = 'e8e3b6d2-2b0g-5f1c-9e2f-3d4e5f6a7b8c'; // Example ID, replace if needed

    const dummyTasks: Task[] = [
      {
        id: uuidv4(),
        projectId: dummyProjectId1, // Link to an existing dummy project
        name: 'Design Homepage Mockups',
        description: 'Create high-fidelity mockups for the new website homepage.',
        status: 'in-progress',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        projectId: dummyProjectId1,
        name: 'Develop Contact Form',
        description: 'Implement the contact form with validation and submission.',
        status: 'todo',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        projectId: dummyProjectId2, // Link to another existing dummy project
        name: 'Backend API for User Auth',
        description: 'Develop the backend API for user authentication and authorization.',
        status: 'done',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        projectId: dummyProjectId2,
        name: 'Implement Push Notifications',
        description: 'Integrate push notification service for critical updates.',
        status: 'in-progress',
        createdAt: now,
        updatedAt: now,
      },
    ];
    saveData(TASKS_STORAGE_KEY, dummyTasks);
  }
}

// Ensure dummy data is initialized on module load
initializeTasks();

/**
 * Fetches all tasks from Local Storage, optionally filtered by project ID.
 * Corresponds to GET /tasks?projectId={id}
 * @param projectId (Optional) The ID of the project to filter tasks by.
 * @returns A promise resolving to an array of Task objects.
 */
export async function getTasks(projectId?: string): Promise<Task[]> {
  const tasks = loadData<Task>(TASKS_STORAGE_KEY);
  if (projectId) {
    return Promise.resolve(tasks.filter(task => task.projectId === projectId));
  }
  return Promise.resolve(tasks);
}

/**
 * Fetches a single task by its ID from Local Storage.
 * Corresponds to GET /tasks/:id
 * @param id The ID of the task to fetch.
 * @returns A promise resolving to the Task object, or undefined if not found.
 */
export async function getTask(id: string): Promise<Task | undefined> {
  const tasks = loadData<Task>(TASKS_STORAGE_KEY);
  return Promise.resolve(tasks.find(task => task.id === id));
}

/**
 * Creates a new task and saves it to Local Storage.
 * Corresponds to POST /tasks
 * @param newTaskData The data for the new task (excluding id, createdAt, updatedAt).
 * @returns A promise resolving to the newly created Task object.
 */
export async function createTask(newTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  const tasks = loadData<Task>(TASKS_STORAGE_KEY);
  const now = new Date().toISOString();
  const newTask: Task = {
    id: uuidv4(),
    ...newTaskData,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(newTask);
  saveData(TASKS_STORAGE_KEY, tasks);
  return Promise.resolve(newTask);
}

/**
 * Updates an existing task in Local Storage.
 * Corresponds to PUT /tasks/:id
 * @param id The ID of the task to update.
 * @param updates Partial task data to apply.
 * @returns A promise resolving to the updated Task object, or undefined if not found.
 */
export async function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | undefined> {
  let tasks = loadData<Task>(TASKS_STORAGE_KEY);
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return Promise.resolve(undefined);
  }

  const updatedTask: Task = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  tasks = [...tasks.slice(0, index), updatedTask, ...tasks.slice(index + 1)];
  saveData(TASKS_STORAGE_KEY, tasks);
  return Promise.resolve(updatedTask);
}

/**
 * Deletes a task from Local Storage.
 * Corresponds to DELETE /tasks/:id
 * @param id The ID of the task to delete.
 * @returns A promise resolving to true if the task was deleted, false otherwise.
 */
export async function deleteTask(id: string): Promise<boolean> {
  let tasks = loadData<Task>(TASKS_STORAGE_KEY);
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  saveData(TASKS_STORAGE_KEY, tasks);
  return Promise.resolve(tasks.length < initialLength);
}