# ----------- Stage 1: Build common (shared code) -----------
FROM node:22-alpine AS common-build
WORKDIR /app/common
COPY common/package*.json ./
RUN npm install
COPY common/ ./
RUN npm run build

# ----------- Stage 2: Build server (backend) -----------
FROM node:22-alpine AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
COPY --from=common-build /app/common/dist ../common/dist
COPY --from=common-build /app/common/package.json /app/common/package.json
RUN npm run build:alone

# ----------- Stage 3: Production image -----------
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=server-build /app/common /app/common
COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/package*.json ./
COPY --from=server-build /app/server/.env.production ./.env.production
WORKDIR /app
RUN npm install --omit=dev

RUN mkdir -p node_modules/@fullstack && \
    ln -s /app/common node_modules/@fullstack/common

EXPOSE 5055
CMD ["node", "dist/index.js"] 