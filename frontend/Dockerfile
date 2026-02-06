FROM node:20-alpine

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste
COPY . .

EXPOSE 3000

# IMPORTANT : écouter sur 0.0.0.0
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
