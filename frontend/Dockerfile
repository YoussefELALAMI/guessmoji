# Build Angular app
FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]