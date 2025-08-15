# Usa una imagen base oficial de Node.js para construir el proyecto
FROM node:22 AS build-stage

# Define el directorio de trabajo
WORKDIR /blue_front

# Copia los archivos de manifiesto
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos del frontend
COPY . .

# Construye la aplicación de Vue.js para producción
RUN npm run build

# Usa una imagen ligera para servir la aplicación estática
FROM nginx:stable-alpine as production-stage

# Copia el archivo de configuración de Nginx personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de la aplicación construida
COPY --from=build-stage /blue_front/dist /usr/share/nginx/html

# Expone el puerto del servidor web
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
