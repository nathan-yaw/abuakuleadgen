# Stage 1: Build
FROM node:18 AS build

WORKDIR /app
# Copy package files from the correct relative path
COPY package.json package-lock.json ./
RUN npm install
# Copy all frontend files from the correct path
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
# Copy nginx.conf from the build context
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]