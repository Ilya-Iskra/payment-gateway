# Build stage
FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN apk add --no-cache python3 make g++
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build


#Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf