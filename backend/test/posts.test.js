const request = require('supertest');
const {expect} = require('chai');
const app = require('../app.js');


// Usamos el hook "describe" para agrupar los tests para un endpoint específico
describe('POST /posts endpoint', () => {
    // "it" para escribir un test individual
    it('Debe de devolver un status 200 y una lista de posts', async () => {
        // Objeto de ejemplo que tu API requiere en el cuerpo de la petición POST
        const testjsonbody = {};

        // Simular la petición POST a tu API
        // app que importamos, que tiene el endpoint
        const res = await request(app)
            .post('/posts') // API
            .send(testjsonbody) // Envía el cuerpo de la petición
            .set('Accept', 'application/json') // Encabezado para indicar el formato
            .expect('Content-Type', /json/); // Esperamos que la respuesta sea JSON

        // Verificaciones con "Chai"
        // Validar que el código de estado sea 200 (OK)
        expect(res.status).to.equal(200);


        // Aseguramos que la respuesta sea un array. 
        expect(res.body).to.be.an('array');

        // verificar que el array no esté vacío
        expect(res.body).to.have.length.above(0);
    });
});