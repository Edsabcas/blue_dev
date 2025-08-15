const express = require('express');
const router = express.Router();
const controller = require('../controllers/consumo_posts');

router.post('/posts', controller.consumirPosts);

// Exportamos el router para que pueda ser usado en app.js
module.exports = router;