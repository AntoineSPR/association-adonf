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

# On copie le package.json (Astro en aura besoin s'il doit utiliser les dépendances en production)
COPY --from=build /app/package.json ./

# On installe seulement les dépendances nécessaires à l'exécution en SSR
RUN npm install --omit=dev

# On copie les dossiers client et server générés par Astro
COPY --from=build /app/dist ./dist

# Variables d'environnement obligatoires pour Astro SSR
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
ENV ASTRO_NODE_CLIENT_DIR=./dist/client

# On expose le port 4321 (port par défaut d'Astro)
EXPOSE 4321

# On démarre le script serveur SSR généré par Astro
CMD ["node", "./dist/server/entry.mjs"]