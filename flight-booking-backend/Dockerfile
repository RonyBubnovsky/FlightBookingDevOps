# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container (will be used by default for all commands)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the src directory to the container (assuming src is in the root folder)
COPY ./src ./src

# Expose the backend port
EXPOSE 3001

# Change directory to src and run npm start
CMD ["npm", "start"]
