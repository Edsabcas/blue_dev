const axios = require('axios');

// Servicio para consumir la API externa
exports.consumirPosts = async (req, res) => {
    // URL de la API externa
    const apiExterna = 'https://687eade4efe65e5200875629.mockapi.io/api/v1/posts';
    //const apiExterna = 'https://jsonplaceholder.typicode.com/posts';

    
    //Consumo de API externa
    try {        
        // Enviamos el cuerpo de la petición que viene de nuestra API
        const response = await axios.post(apiExterna, req.body);
        const data = response.data;
        console.log("Respuesta consumo");
        console.log(data);

        // Verificamos si la respuesta es un array o un objeto
        if (Array.isArray(data)) {
            // Si es un array, devolvemos el array completo
            return res.status(200).json(data);
        } else if (typeof data === 'object' && data !== null) {
            // Si es un objeto, lo devolvemos
            const array_data = [];
            array_data.push(data);
            return res.status(200).json(array_data);
        } else {
            // Manejamos cualquier otro tipo de dato inesperado
            return res.status(500).json({ error: 'Sin respueta de la api' });
        }

    } catch (error) {
        console.error('Sin respuesta satisfactoria de la API:', error);
        // Devolvemos un mensaje de error si la petición falla
        return res.status(500).json({ error: 'Sin respuesta satisfactoria de la API.' });
    }
};
