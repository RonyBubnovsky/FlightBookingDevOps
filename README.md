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
- Node.js (for running the frontend locally)

## Important Prerequisites

⚠️ **Before starting the project:**
1. Ensure any local PostgreSQL instance is stopped as it might conflict with the Docker container:
   - On Windows: Stop the PostgreSQL service in Services
   - On Linux: `sudo service postgresql stop`
   - On macOS: `brew services stop postgresql`
2. Make sure port 5432 is free:
   - You can check for processes using this port:
     - On Windows: `netstat -ano | findstr 5432`
     - On Linux/macOS: `lsof -i :5432`
   - Kill any process using port 5432 if necessary:
     - On Windows: `taskkill /PID <PID> /F`
     - On Linux/macOS: `kill -9 <PID>`

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

1. **Port 5432 Already in Use**
   - Follow the steps in the Prerequisites section to stop PostgreSQL and free up port 5432
   - If the issue persists, you may need to check for other applications using this port

2. **Docker Container Failed to Start**
   - Ensure Docker Desktop is running
   - Check Docker logs using `docker logs <container_name>`
   - Try removing existing containers and images:
     ```bash
     docker-compose down
     docker system prune -a
     ```

3. **Database Connection Issues**
   - Verify PostgreSQL container is running: `docker ps`
   - Check container logs: `docker logs <postgres_container_name>`
   - Ensure environment variables in docker-compose.yml are correct

## Contributing

Feel free to fork this project and create pull requests. Contributions are welcome!

