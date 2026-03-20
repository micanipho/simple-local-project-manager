import { v4 as uuidv4 } from 'uuid';
import { Project } from '../types';
import { PROJECTS_STORAGE_KEY } from '../constants';
import { loadData, saveData } from '../utils/localStorage';

/**
 * Initializes Local Storage with some dummy project data if it's empty.
 */
function initializeProjects() {
  const projects = loadData<Project>(PROJECTS_STORAGE_KEY);
  if (projects.length === 0) {
    const now = new Date().toISOString();
    const dummyProjects: Project[] = [
      {
        id: uuidv4(),
        name: 'Website Redesign',
        description: 'Redesign the company website for better UX and modern aesthetics.',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Mobile App Development',
        description: 'Develop a new mobile application for iOS and Android platforms.',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Marketing Campaign Launch',
        description: 'Plan and execute a new digital marketing campaign for product X.',
        createdAt: now,
        updatedAt: now,
      },
    ];
    saveData(PROJECTS_STORAGE_KEY, dummyProjects);
  }
}

// Ensure dummy data is initialized on module load
initializeProjects();

/**
 * Fetches all projects from Local Storage.
 * Corresponds to GET /projects
 * @returns A promise resolving to an array of Project objects.
 */
export async function getProjects(): Promise<Project[]> {
  return Promise.resolve(loadData<Project>(PROJECTS_STORAGE_KEY));
}

/**
 * Fetches a single project by its ID from Local Storage.
 * Corresponds to GET /projects/:id
 * @param id The ID of the project to fetch.
 * @returns A promise resolving to the Project object, or undefined if not found.
 */
export async function getProject(id: string): Promise<Project | undefined> {
  const projects = loadData<Project>(PROJECTS_STORAGE_KEY);
  return Promise.resolve(projects.find(project => project.id === id));
}

/**
 * Creates a new project and saves it to Local Storage.
 * Corresponds to POST /projects
 * @param newProjectData The data for the new project (excluding id, createdAt, updatedAt).
 * @returns A promise resolving to the newly created Project object.
 */
export async function createProject(newProjectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const projects = loadData<Project>(PROJECTS_STORAGE_KEY);
  const now = new Date().toISOString();
  const newProject: Project = {
    id: uuidv4(),
    ...newProjectData,
    createdAt: now,
    updatedAt: now,
  };
  projects.push(newProject);
  saveData(PROJECTS_STORAGE_KEY, projects);
  return Promise.resolve(newProject);
}

/**
 * Updates an existing project in Local Storage.
 * Corresponds to PUT /projects/:id
 * @param id The ID of the project to update.
 * @param updates Partial project data to apply.
 * @returns A promise resolving to the updated Project object, or undefined if not found.
 */
export async function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | undefined> {
  let projects = loadData<Project>(PROJECTS_STORAGE_KEY);
  const index = projects.findIndex(project => project.id === id);

  if (index === -1) {
    return Promise.resolve(undefined);
  }

  const updatedProject: Project = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  projects = [...projects.slice(0, index), updatedProject, ...projects.slice(index + 1)];
  saveData(PROJECTS_STORAGE_KEY, projects);
  return Promise.resolve(updatedProject);
}

/**
 * Deletes a project from Local Storage.
 * Corresponds to DELETE /projects/:id
 * @param id The ID of the project to delete.
 * @returns A promise resolving to true if the project was deleted, false otherwise.
 */
export async function deleteProject(id: string): Promise<boolean> {
  let projects = loadData<Project>(PROJECTS_STORAGE_KEY);
  const initialLength = projects.length;
  projects = projects.filter(project => project.id !== id);
  saveData(PROJECTS_STORAGE_KEY, projects);
  return Promise.resolve(projects.length < initialLength);
}