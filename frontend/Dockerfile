# Stage 1: Build the React app
FROM node:16 as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:registry.access.redhat.com/ubi8/nginx-120

# Copy built assets from Stage 1
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will serve on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
