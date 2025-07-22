# Development stage
FROM node:20-alpine as development

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 4200
CMD ["npm", "start"]

# Production build stage
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Production serve stage
FROM nginx:alpine as production
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]