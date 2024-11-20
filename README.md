# Flight Booking App with DevOps Integration

This project is a Flight Booking App that allows users to search for flights, book flights, and manage their bookings. It features the integration of DevOps concepts such as Docker containers and CI, providing a smooth development process.

## Features

- **Flight Search**: Users can search for flights based on name, departure city, and destination city.
- **Booking**: Users can book available flights, and booked flights will be removed from the available flights list.
- **My Bookings**: Users can view all of their booked flights, with the ability to cancel bookings.
- **Docker Integration**: Both the backend (Node.js) and PostgreSQL are containerized using Docker, and the backend uses Docker Compose for management.
- **Automated Testing**: End-to-end testing using Cypress, integrated into the CI pipeline

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (in Docker container)
- **Testing**: Frontend - Cypress, Backend - Jest
- **DevOps Concepts**: Docker, Docker Compose, CI Pipeline, Automated Testing

## Requirements

- Docker Desktop (running and open)
- Node.js

## Installing Requirements

### Docker Desktop Installation

#### Windows:
1. **Download Docker Desktop**
   - Go to the official Docker website: https://www.docker.com/products/docker-desktop
   - Click "Download for Windows"
   - Choose the appropriate version (Intel or Apple Silicon)

2. **Installation Steps**
   - Run the downloaded installer
   - Follow the installation wizard
   - Choose "Use recommended settings" during installation
   - Restart your computer when prompted

3. **Post-Installation**
   - Open Docker Desktop
   - Allow it to make changes to your system
   - Wait for Docker to initialize
   - Verify installation by opening a command prompt and running:
     ```bash
     docker --version
     docker-compose --version
     ```

#### macOS:
1. **Download Docker Desktop**
   - Visit https://www.docker.com/products/docker-desktop
   - Click "Download for Mac"
   - Choose the version for Intel Chip or Apple Silicon (M1/M2)

2. **Installation Steps**
   - Open the downloaded .dmg file
   - Drag Docker to the Applications folder
   - Launch Docker from Applications
   - Approve system permissions when prompted

3. **Post-Installation**
   - Open Terminal
   - Run verification commands:
     ```bash
     docker --version
     docker-compose --version
     ```

#### Linux (Ubuntu/Debian):
1. **Update Package Index**
   ```bash
   sudo apt-get update
   ```

2. **Install Prerequisites**
   ```bash
   sudo apt-get install ca-certificates curl gnupg
   ```

3. **Add Docker's Official GPG Key**
   ```bash
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
   ```

4. **Set Up Repository**
   ```bash
   echo \
     "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
     "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. **Install Docker Desktop**
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

### Node.js Installation

#### Windows:
1. **Download Node.js**
   - Visit https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Run the installer
   - Check "Automatically install the necessary tools" during installation
   - Restart your computer after installation

2. **Verify Installation**
   - Open Command Prompt
   - Run:
     ```bash
     node --version
     npm --version
     ```

#### macOS:
1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Direct Download**
   - Visit https://nodejs.org/
   - Download the LTS version
   - Open the .pkg file
   - Follow installation wizard

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian):
1. **Using Node Version Manager (NVM)**
   ```bash
   # Install NVM
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   
   # Reload shell
   source ~/.bashrc
   
   # Install latest LTS Node.js version
   nvm install --lts
   ```

2. **Using Package Manager**
   ```bash
   sudo apt-get update
   sudo apt-get install nodejs npm
   ```

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

### Troubleshooting

- If you encounter permission issues, try running commands with `sudo`
- For Docker, ensure your user is in the docker group:
  ```bash
  sudo usermod -aG docker $USER
  ```
- Restart your terminal or computer after installations
- Check official documentation for the most up-to-date installation instructions

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/RonyBubnovsky/FlightBookingDevOps
cd FlightBookingDevOps
```

### 2. Install frontend dependencies

First, install the dependencies for the frontend.

**Frontend (React)**
Navigate to the frontend directory and run:

```bash
npm install
```

### 3. Running the project

Before starting the backend, make sure Docker Desktop is open and running.

**Backend**
To start the backend using Docker, run the following command inside the backend directory:

```bash
docker-compose up --build
```

This will build and start both the backend and PostgreSQL containers. Docker Compose ensures that the PostgreSQL container and the backend are linked and run correctly.

**Frontend**
After the backend is up and running, navigate to the frontend directory and run:

```bash
npm start
```

This will start the React development server, and your app will be accessible at http://localhost:3000.

### 4. Access the application

- Frontend: Navigate to http://localhost:3000 in your browser to access the Flight Booking App.
- Backend API: The backend API is running on http://localhost:3001 and handles flight and booking data.

### 5. Running Tests

To run the Cypress tests locally, navigate to the frontend directory and run:

```bash
npx cypress open
```

This will open the Cypress Test Runner, where you can run individual tests or the entire test suite.

### 6. Stopping the project

- To stop the backend containers, you can press `Ctrl+C` in the terminal where you ran `docker-compose up --build`.
- To stop the React frontend, press `Ctrl+C` in the terminal where you ran `npm start`.

### 7. Docker Considerations

Make sure Docker Desktop is running when you start the backend, as it uses Docker containers for both the Node.js server and PostgreSQL.

## DevOps Features

### Docker

- The backend and PostgreSQL are both containerized using Docker. This ensures a consistent environment across different stages of development and production.
- Docker Compose is used to manage the services (backend and PostgreSQL) in a single command.

### Testing

- End-to-end testing is implemented using Cypress
- Tests cover critical user flows including:
  - Flight search functionality
  - Booking process
  - Booking management
  - Error handling
- Tests are automatically run as part of the CI pipeline

### CI

The project is integrated with Continuous Integration (CI) pipeline. This ensures that any code changes automatically trigger:

1. Running the Cypress test suite
2. Building Docker containers

The CI pipeline helps maintain code quality by:

- Ensuring all tests pass
- Maintaining consistent build
- Automating the testing
- Providing quick feedback on code changes

### Branch Strategy

The main branch is protected - changes must be made through pull requests that pass CI checks.

## Troubleshooting

### Common Issues

1. **Docker Container Failed to Start**
   - Ensure Docker Desktop is running
   - Check Docker logs using `docker logs <container_name>`
   - Try removing existing containers and images:
     ```bash
     docker-compose down
     docker system prune -a
     ```

2. **Database Connection Issues**
   - Verify PostgreSQL container is running: `docker ps`
   - Check container logs: `docker logs <postgres_container_name>`
   - Ensure environment variables in docker-compose.yml are correct

## Contributing

Feel free to fork this project and create pull requests. Contributions are welcome!
