FROM node:16

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Installer Prisma globalement
RUN npm install -g prisma

# Copier le reste du projet
COPY . .

# Générer le client Prisma
RUN prisma generate

# Exposer le port pour l'application
EXPOSE 3000

# Démarrer le serveur Node.js
CMD ["node", "dist/server.js"]
