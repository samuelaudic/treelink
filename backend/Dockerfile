FROM node:18.18.0

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Installer Prisma globalement
RUN npm install -g prisma

# Copier le reste du projet
COPY . .

# Complier le TS en JS
RUN npm run build

# Générer le client Prisma
RUN prisma generate --schema=./src/prisma/schema.prisma

# Exposer le port pour l'application
EXPOSE 3000

# Démarrer le serveur Node.js
CMD ["node", "dist/server.js"]
