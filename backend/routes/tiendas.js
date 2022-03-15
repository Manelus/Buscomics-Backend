const express = require('express');
const router = express.Router();

//Importo modelo de datos
const TiendaController = require('../controllers/tienda');


// Dos rutas: login y registro
// /api/singin & /api/singup
router.post('/signin', TiendaController.signIn);
router.post('/signup', TiendaController.signUp);
router.post('/logout', TiendaController.logout);

module.exports = router;