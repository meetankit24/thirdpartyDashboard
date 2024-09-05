# backend/Dockerfile
FROM node:registry.access.redhat.com/ubi8/nodejs-16-minimal

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the app
CMD ["npm", "start"]
