# Task management system Backend

- **API for task managment:** Provide api for task management system application.

## Features

### List of API's

- **Create Tasks:** Add new tasks with a title, description, and status.
- **Update Tasks:** Update tasks with a title, description and status.
- **Delete Tasks:** Delete tasks.

## Installation (Option 1 - Local Setup)

- Application can be directly setup in local machine with below steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version >=22.0.0 or higher)
- [npm](https://www.npmjs.com/) (version >=10.7.0 or higher)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/username/task-management-app.git
```

2. **Install Dependency:**

- Install required packages for run application.

```bash
npm install
```

3. **Run Application Locally:**

```bash
yarn run start:dev
```

4. **Build Application:**

- To make application build using below command.

```bash
npm run build
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
