FROM nginx:alpine

# Copier la configuration Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Créer les répertoires nécessaires
RUN mkdir -p /var/www/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]