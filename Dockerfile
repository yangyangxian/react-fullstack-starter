# ----------- Stage 1: Build common (shared code) -----------
FROM node:22-alpine AS common-build
WORKDIR /app/common
COPY common/package*.json ./
RUN npm install
COPY common/ ./
RUN npm run build

# ----------- Stage 2: Build client (frontend) -----------
FROM node:22-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
COPY --from=common-build /app/common/dist ../common/dist
COPY --from=common-build /app/common/package.json /app/common/package.json
RUN npm run build:alone

# ----------- Stage 3: Build server (backend) -----------
FROM node:22-alpine AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
COPY --from=common-build /app/common/dist ../common/dist
COPY --from=common-build /app/common/package.json /app/common/package.json
RUN npm run build:alone

# ----------- Stage 4: Production image -----------
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy server build
COPY --from=server-build /app/common /app/common
COPY --from=server-build /app/server/dist ./server/dist
COPY --from=server-build /app/server/package*.json ./server/
COPY --from=server-build /app/server/.env.production ./server/.env.production
# Copy client build into server static directory
COPY --from=client-build /app/client/dist ./client/dist

WORKDIR /app/server
RUN npm install --omit=dev

# Create a symlink to the common/dist directory
RUN mkdir -p node_modules/@fullstack && \
    ln -s /app/common node_modules/@fullstack/common

EXPOSE 5055
CMD ["node", "dist/index.js"] 