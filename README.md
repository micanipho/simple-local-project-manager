# Simple Local Project Manager

## 🚀 Project Overview

The **Simple Local Project Manager** is a desktop application meticulously designed for individual users to effortlessly create, manage, and track their projects and associated tasks. With a strong emphasis on simplicity and ease of use, this application ensures that all project and task data is stored locally on the user's machine, guaranteeing full functionality without the need for an internet connection or external services. It's the perfect tool for personal project tracking, providing a clear overview of your work, its progress, and upcoming deadlines.

## ✨ Features

*   **Project Management**: Create, view, update, and delete projects. Define a name, description, and status for each project.
*   **Task Management**: Create, view, update, and delete tasks within specific projects. Each task can have a name, description, due date, and individual status.
*   **Project Status Tracking**: Monitor the overall progress of your projects with customizable status options (e.g., Not Started, In Progress, Completed, On Hold).
*   **Task Status Tracking**: Track the individual progress of tasks with distinct status options (e.g., To Do, In Progress, Done, Blocked).
*   **Due Date Management**: Assign and track due dates for tasks to ensure timely completion.
*   **Local Data Storage**: All application data is securely stored on your local machine using SQLite, ensuring privacy and offline access.
*   **Intuitive User Interface**: A clean, straightforward interface built with React and styled with Tailwind CSS for a smooth user experience.

## 🛠️ Tech Stack

This application is built using a modern and robust tech stack, chosen for its performance, developer experience, and suitability for a local desktop application.

*   **Frontend**:
    *   **React**: A declarative, component-based JavaScript library for building user interfaces. Chosen for its efficiency in creating interactive UIs and strong community support.
    *   **Vite**: A next-generation frontend tooling that provides an extremely fast development server and optimized build process, enhancing developer productivity.
    *   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. It adds static type checking, improving code quality, maintainability, and developer experience, especially in larger applications.
    *   **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development by composing classes directly in your markup, ensuring a consistent and customizable design.
*   **Backend & Desktop Framework**:
    *   **Tauri**: A framework for building cross-platform desktop applications with web frontends. It leverages Rust for the backend, providing native performance, security, and direct access to system APIs (like SQLite), while allowing the use of web technologies for the UI.
    *   **Rust**: A systems programming language known for its performance, memory safety, and concurrency. It powers the backend logic and database interactions within Tauri.
*   **Database**:
    *   **SQLite**: A lightweight, serverless, file-based relational database management system. It's ideal for local desktop applications as it requires no separate server process and stores all data in a single file on the user's machine.
    *   **Drizzle ORM**: A modern, type-safe ORM for TypeScript that works seamlessly with SQLite. It simplifies database interactions by providing an intuitive API for defining schemas and performing queries, ensuring type safety from the database to the application layer.

## 📦 Data Model / Entities

The application revolves around two primary entities: `Project` and `Task`.

### Project

Represents a high-level project that can contain multiple tasks.

| Field        | Type     | Description                                     |
| :----------- | :------- | :---------------------------------------------- |
| `id`         | `UUID`   | Unique identifier for the project (Primary Key) |
| `name`       | `TEXT`   | Name of the project (required)                  |
| `description`| `TEXT`   | Detailed description of the project (optional)  |
| `status`     | `TEXT`   | Current status of the project (e.g., 'Not Started', 'In Progress', 'Completed', 'On Hold') |
| `createdAt`  | `INTEGER`| Timestamp when the project was created          |
| `updatedAt`  | `INTEGER`| Timestamp of the last update to the project     |

### Task

Represents an individual task associated with a specific project.

| Field        | Type     | Description                                     |
| :----------- | :------- | :---------------------------------------------- |
| `id`         | `UUID`   | Unique identifier for the task (Primary Key)    |
| `projectId`  | `UUID`   | Foreign Key linking to the parent Project       |
| `name`       | `TEXT`   | Name of the task (required)                     |
| `description`| `TEXT`   | Detailed description of the task (optional)     |
| `dueDate`    | `INTEGER`| Unix timestamp for the task's due date (optional) |
| `status`     | `TEXT`   | Current status of the task (e.g., 'To Do', 'In Progress', 'Done', 'Blocked') |
| `createdAt`  | `INTEGER`| Timestamp when the task was created             |
| `updatedAt`  | `INTEGER`| Timestamp of the last update to the task        |

## 🔗 API Endpoints Overview (Tauri Commands)

As a local desktop application, there are no traditional HTTP API endpoints. Instead, the frontend communicates with the Rust backend through Tauri's inter-process communication (IPC) mechanism, invoking Rust functions exposed as "commands".

### Project Commands

*   `create_project(name: string, description: string)`: Creates a new project.
*   `get_all_projects()`: Retrieves a list of all projects.
*   `get_project_by_id(id: string)`: Retrieves a single project by its ID.
*   `update_project(id: string, name: string, description: string, status: string)`: Updates an existing project's details.
*   `delete_project(id: string)`: Deletes a project and all its associated tasks.

### Task Commands

*   `create_task(projectId: string, name: string, description: string, dueDate: string | null)`: Creates a new task for a specified project.
*   `get_tasks_by_project_id(projectId: string)`: Retrieves all tasks belonging to a specific project.
*   `get_task_by_id(id: string)`: Retrieves a single task by its ID.
*   `update_task(id: string, name: string, description: string, dueDate: string | null, status: string)`: Updates an existing task's details.
*   `delete_task(id: string)`: Deletes a specific task.

## 🖥️ Pages and Navigation

The application provides a straightforward navigation structure to manage projects and tasks efficiently.

*   **Dashboard/Home Page**:
    *   An overview of all projects, potentially with quick status summaries or upcoming tasks.
    *   Provides quick access to create new projects.
*   **Project List Page (`/projects`)**:
    *   Displays a list of all projects, showing their names, descriptions, and overall status.
    *   Allows users to navigate to individual project detail pages.
*   **Project Detail Page (`/projects/:id`)**:
    *   Shows the full details of a selected project (name, description, status).
    *   Lists all tasks associated with that project, including their names, descriptions, due dates, and individual statuses.
    *   Provides options to edit the project, create a new task within the project, or delete the project.
*   **Task Detail/Edit Page (`/tasks/:id` or `/projects/:projectId/tasks/:taskId`)**:
    *   Displays the full details of a specific task.
    *   Allows users to edit task attributes like name, description, due date, and status.
*   **Create Project Page (`/projects/new`)**:
    *   A form for users to input details and create a new project.
*   **Create Task Page (`/projects/:projectId/tasks/new`)**:
    *   A form for users to input details and create a new task within a specified project.

**Navigation**: A persistent sidebar or top navigation bar will allow users to easily switch between the "Dashboard" and "Projects" list. Contextual navigation (e.g., "View Project" button from a task list) will handle transitions to detail pages.

## 🚀 Getting Started Guide

Follow these instructions to set up and run the Simple Local Project Manager on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: [Download & Install Node.js](https://nodejs.org/) (LTS version recommended). This includes npm.
*   **Rust Toolchain**: [Install Rustup](https://rustup.rs/). Rustup is a tool for managing Rust versions and associated tools.
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
    Follow the on-screen instructions. You might need to restart your terminal or source your shell's profile.
*   **Tauri Prerequisites**: Depending on your operating system, you might need additional dependencies. Refer to the [Tauri Setup Guide](https://tauri.app/v1/guides/getting-started/prerequisites) for details.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/simple-local-project-manager.git
    cd simple-local-project-manager
    ```
    (Replace `your-username/simple-local-project-manager.git` with the actual repository URL)

2.  **Install frontend dependencies**:
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

### Running in Development Mode

This will start the Tauri development server, which hot-reloads both the Rust backend and React frontend.

```bash
npm run tauri dev
# or yarn tauri dev
# or pnpm tauri dev
```

The application window should open, and you can see real-time updates as you make changes to the code.

### Building for Release

To create a production-ready executable for your operating system:

```bash
npm run tauri build
# or yarn tauri build
# or pnpm tauri build
```

The compiled application binary will be located in the `src-tauri/target/release/bundle/` directory, specific to your OS (e.g., `.dmg` for macOS, `.msi` for Windows, `.deb` for Linux).

## 🔑 Environment Variables

For this simple local project manager, no specific environment variables are required for basic operation. All data is stored locally within the application's data directory.

If future features require API keys or external service configurations, they would be listed here.

## 📂 Project Structure Overview

The project follows a standard Tauri + React + Vite structure:

```
simple-local-project-manager/
├── src-tauri/                 # Tauri backend (Rust code)
│   ├── src/                   # Rust source code
│   │   ├── main.rs            # Main Tauri application entry point
│   │   ├── commands.rs        # Tauri commands (functions exposed to frontend)
│   │   ├── db/                # Database setup and Drizzle schema
│   │   │   ├── mod.rs
│   │   │   ├── schema.rs      # Drizzle schema definition
│   │   │   └── connection.rs  # Database connection logic
│   │   └── models.rs          # Rust structs for data models
│   ├── Cargo.toml             # Rust project manifest and dependencies
│   └── tauri.conf.json        # Tauri configuration (window, commands, plugins)
├── src/                       # React frontend (TypeScript code)
│   ├── assets/                # Static assets (images, icons)
│   ├── components/            # Reusable React UI components
│   ├── pages/                 # Main application views/pages
│   ├── lib/                   # Utility functions, hooks, shared logic
│   ├── styles/                # Tailwind CSS configuration and base styles
│   ├── App.tsx                # Main React application component
│   ├── main.tsx               # React application entry point
│   └── index.css              # Global styles (imported by Tailwind)
├── public/                    # Static files served directly (e.g., favicon)
├── .gitignore                 # Files and directories to ignore in Git
├── package.json               # Frontend dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This document
```

---
**Note**: This README provides a comprehensive overview. Specific implementation details (e.g., exact enum values for status, UUID generation) will be determined during development.
---