const express = require('express');
const router = express.Router();
var auth = require('../middlewares/auth');
//Importo modelo de datos
const comicController = require('../controllers/comics');
// End-points CRUD 
router.get('/', comicController.getAll);

router.get('/buscar/:nombre', comicController.getByName);

router.post('/register', auth, comicController.create);

router.put('/', auth, comicController.update);

router.delete('/:id', auth, comicController.delete);

module.exports = router;