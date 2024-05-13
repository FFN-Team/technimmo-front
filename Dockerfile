# Utiliser une image de Node.js comme base
FROM node:14-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]