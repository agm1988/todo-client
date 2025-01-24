# Stage 1: Build the React app
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the React app
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build files to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Dynamically generate config.js at runtime
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Use the custom entrypoint script
CMD ["/entrypoint.sh"]
