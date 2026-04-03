# Étape 1 : Build
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Étape 2 : Production Runtime (Exécution du serveur Astro SSR)
FROM node:20-alpine AS prod-runtime
WORKDIR /app

COPY --from=build /app/package.json ./

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]