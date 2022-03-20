var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
//Importo modelo de datos
const tiendaController = require('../controllers/tiendas');


// Dos rutas: login y registro
// /api/singin & /api/singup
router.post('/signin', tiendaController.signIn);

router.post('/signup', tiendaController.signUp);

router.delete('/logout', auth, tiendaController.logout);

router.delete('/delete/', auth, tiendaController.delete);

module.exports = router;