# Usa una imagen base oficial de Node.js
FROM node:22-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /backend

# Copia los archivos de manifiesto del proyecto
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará (puerto del backend)
EXPOSE 3000

# Define el comando que se ejecutará cuando el contenedor se inicie
CMD ["npm", "start"]
