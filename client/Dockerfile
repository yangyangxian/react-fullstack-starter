# ----------- Stage 1: Build common (shared code) -----------
FROM node:20-alpine AS common-build
WORKDIR /app/common
COPY common/package*.json ./
RUN npm install
COPY common/ ./
RUN npm run build

# ----------- Stage 2: Build client (frontend) -----------
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
COPY --from=common-build /app/common/dist ../common/dist
COPY --from=common-build /app/common/package.json /app/common/package.json
RUN npm run build:alone

# ----------- Stage 3: Production image (Nginx) -----------
FROM nginx:1.25-alpine AS production
COPY --from=client-build /app/client/dist /usr/share/nginx/html
RUN printf 'events {}\n\
http {\n\
  include /etc/nginx/mime.types;\n\
  default_type application/octet-stream;\n\
  server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location ~* \\.(js|css|mjs|json|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$ {\n\
      try_files $uri =404;\n\
      expires 30d;\n\
      add_header Cache-Control "public";\n\
    }\n\
    location / {\n\
      try_files $uri $uri/ /index.html;\n\
    }\n\
  }\n\
}\n' > /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 