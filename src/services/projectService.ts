```typescript
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage';
import { PROJECTS_STORAGE_KEY } from '../constants';
import { Project, CreateProjectDTO, UpdateProjectDTO } from '../types';

/**
 * Simulates API calls for Project management using Local Storage.
 */
const projectService = {
  /**
   * GET /projects
   * Retrieves all projects from local storage.
   * @returns A promise resolving to an array of Project objects.
   */
  getProjects(): Promise<Project[]> {
    return new Promise((resolve) => {
      const projects = getLocalStorageItem<Project[]>(PROJECTS_STORAGE_KEY) || [];
      resolve(projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    });
  },

  /**
   * GET /projects/:id
   * Retrieves a single project by ID.
   * @param id The ID of the project.
   * @returns A promise resolving to the Project object or null if not found.
   */
  getProject(id: string): Promise<Project | null> {
    return new Promise((resolve) => {
      const projects = getLocalStorageItem<Project[]>(PROJECTS_STORAGE_KEY) || [];
      const project = projects.find(p => p.id === id);
      resolve(project || null);
    });
  },

  /**
   * POST /projects
   * Creates a new project.
   * @param data The project data to create.
   * @returns A promise resolving to the newly created Project object.
   */
  createProject(data: CreateProjectDTO): Promise<Project> {
    return new Promise((resolve) => {
      const projects = getLocalStorageItem<Project[]>(PROJECTS_STORAGE_KEY) || [];
      const now = new Date().toISOString();
      const newProject: Project = {
        id: uuidv4(),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      projects.push(newProject);
      setLocalStorageItem(PROJECTS_STORAGE_KEY, projects);
      resolve(newProject);
    });
  },

  /**
   * PUT /projects/:id
   * Updates an existing project.
   * @param id The ID of the project to update.
   * @param data The partial project data to update.
   * @returns A promise resolving to the updated Project object or null if not found.
   */
  updateProject(id: string, data: UpdateProjectDTO): Promise<Project | null> {
    return new Promise((resolve) => {
      let projects = getLocalStorageItem<Project[]>(PROJECTS_STORAGE_KEY) || [];
      const projectIndex = projects.findIndex(p => p.id === id);

      if (projectIndex === -1) {
        resolve(null);
        return;
      }

      const updatedProject: Project = {
        ...projects[projectIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      projects[projectIndex] = updatedProject;
      setLocalStorageItem(PROJECTS_STORAGE_KEY, projects);
      resolve(updatedProject);
    });
  },

  /**
   * DELETE /projects/:id
   * Deletes a project by ID.
   * Note: This service does not handle cascading deletes for tasks.
   * Task deletion for a project should be handled separately by the caller if needed.
   * @param id The ID of the project to delete.
   * @returns A promise resolving to true if deleted, false otherwise.
   */
  deleteProject(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      let projects = getLocalStorageItem<Project[]>(PROJECTS_STORAGE_KEY) || [];
      const initialLength = projects.length;
      projects = projects.filter(p => p.id !== id);

      if (projects.length < initialLength) {
        setLocalStorageItem(PROJECTS_STORAGE_KEY, projects);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
};

export default projectService;
```