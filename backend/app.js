const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Importamos el archivo de rutas
const postsRoutes = require('./routes/route_node');

//Parsear el body de las peticiones en formato JSON
app.use(express.json());
app.use(cors());

// Configuramos la aplicación para que use nuestras rutas
app.use(postsRoutes);

// Iniciamos el servidor para que escuche en el puerto definido
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;