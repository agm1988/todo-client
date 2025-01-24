# Build stage
FROM node:16 as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Serve stage with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Dynamically generate config.js with runtime environment variables
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
