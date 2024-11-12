# Flight Booking App with DevOps Integration!

This project is a Flight Booking App that allows users to search for flights, book flights, and manage their bookings. It features the integration of DevOps concepts such as Docker containers and CI/CD, providing a smooth development and deployment process.

## Features

- **Flight Search**: Users can search for flights based on name, departure city, and destination city.
- **Booking**: Users can book available flights, and booked flights will be removed from the available flights list.
- **My Bookings**: Users can view all of their booked flights, with the ability to cancel bookings.
- **Docker Integration**: Both the backend (Node.js) and MongoDB are containerized using Docker, and the backend uses Docker Compose for management.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB (in Docker container)
- **DevOps Concepts**: Docker, Docker Compose, CI/CD
- **Deployment**: Render

## Requirements

- Docker Desktop (running and open)
- Node.js (for running the frontend locally)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/RonyBubnovsky/FlightBookingDevOps
cd FlightBookingDevOps
```

### 2. Install dependencies

First, install the dependencies for both the frontend and the backend.

**Backend (Node.js + Express)**
Navigate to the backend directory and run:

```bash
npm install
```

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

This will build and start both the backend and MongoDB containers. Docker Compose ensures that the MongoDB container and the backend are linked and run correctly.

**Frontend**
After the backend is up and running, navigate to the frontend directory and run:

```bash
npm start
```

This will start the React development server, and your app will be accessible at http://localhost:3000.

### 4. Access the application

- Frontend: Navigate to http://localhost:3000 in your browser to access the Flight Booking App.
- Backend API: The backend API is running on http://localhost:3001 and handles flight and booking data.

### 5. Stopping the project

- To stop the backend containers, you can press `Ctrl+C` in the terminal where you ran `docker-compose up --build`.
- To stop the React frontend, press `Ctrl+C` in the terminal where you ran `npm start`.

### 6. Docker Considerations

Make sure Docker Desktop is running when you start the backend, as it uses Docker containers for both the Node.js server and MongoDB.

## DevOps Features

### Docker

- The backend and MongoDB are both containerized using Docker. This ensures a consistent environment across different stages of development and production.
- Docker Compose is used to manage the services (backend and MongoDB) in a single command.

### CI/CD

The project is integrated with Continuous Integration (CI) and Continuous Deployment (CD) pipelines. This ensures that any code changes automatically trigger tests, builds, and deployments.

#### Deployment Process

- The application follows a branch-based deployment strategy
- The `production` branch serves as both the main development branch and the deployment branch
- All changes pushed to the `production` branch are automatically deployed to Render
- The deployment process is triggered automatically when changes are pushed to the production branch
- Render handles the build and deployment process, ensuring zero-downtime deployments

### Branch Strategy

- `production`: Main development branch that triggers automatic deployments to Render
- `stage`: Mirror of the production branch but without deployment triggers, used for testing and staging environments
- Both `production` and `stage` branches are protected:
  - Direct pushes to these branches are not allowed
  - All changes must be made through pull requests
  - Pull requests must pass CI checks before they can be merged
  - Code review is required before merging
- Feature branches should be created for new development
- Process for adding new features:
  1. Create a new feature branch
  2. Develop and test your changes
  3. Create a pull request targeting either `production` or `stage`
  4. Wait for CI checks to pass
  5. Obtain code review approval
  6. Once approved and CI passes, changes can be merged
  7. For `production` branch merges, Render will automatically deploy the changes

## Contributing

Feel free to fork this project and create pull requests. Contributions are welcome!
