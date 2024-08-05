# Task management system Frontend

- **Task Management Interface:** Provides a user-friendly interface for creating, updating, and deleting tasks.
- **Status-Based Filtering:** Allows users to filter tasks based on their status for more efficient task management.

## Features

- **User Interface:** Built with React to create a UI for the task management system.
  - **Create Tasks:** Add new tasks with a title, description, and status.
  - **Update Tasks:** Update tasks with a title, description and status.
  - **Delete Tasks:** Delete tasks.
  - **Show Tasks:** Display task details.
- **Routing:** Client-side routing with React Router.
- **State Management:** Redux, Redux Toolkit, and React-Redux libraries are used to manage application state.
- **Testing:** Write end-to-end test cases using Cypress.

## Installation (Option 1 - Local Setup)

- Application can be directly setup in local machine with below steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version >=22.0.0 or higher)
- [npm](https://www.npmjs.com/) (version >=10.7.0 or higher) or [yarn](https://classic.yarnpkg.com/) (version >=1.22.0 or higher)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/username/task-management-app.git
```

2. **Install Dependency:**

- Install required packages for run application.

```bash
yarn install
```

3. **Run Application Locally:**

```bash
yarn run dev
```

4. **Build Application:**

- To make application build using below command.

```bash
yarn run build
```

5. **Run E2E Using Cypress:**

```bash
yarn run cy:open-e2e
```

## Installation (Option 2 - Docker Image)

- Application can be setup in docker container.

### Prerequisites

- [MacOS](https://docs.docker.com/desktop/install/mac-install/) to install docker desktop on macOs depends on intel or apple chip.
- [Window](https://docs.docker.com/desktop/install/windows-install/) to install docker desktop on windows.
- [Debian/Ubuntu/Red Hat/Fedora](https://docs.docker.com/desktop/install/linux-install/) to install docker on any of listed linux distribution.

### Steps

- The Dockerfile is available for both the frontend and backend servers.
- For the database, we use PostgreSQL.
- A docker-compose.yml file is provided to run the entire infrastructure (database, backend, and frontend) at once.

1. Run docker compose yml file

```bash
docker compose up --build
```

2. Stop docker compose using compose yml file

```bash
docker compose down
```
