const express = require('express');
const router = express.Router();
//Importo modelo de datos
const ComicController = require('../controllers/comics');
// End-points CRUD 
router.get('/', ComicController.getAll);
router.get('/nombre', ComicController.getByName);
router.get('/autor', ComicController.getByAutor);
router.get('/personaje', ComicController.getByPersonaje);
router.post('/', auth, ComicController.create);
router.put('/:id', ComicController.update);
router.delete('/', auth, ComicController.deleteAll);
router.delete('/:nombre', auth, ComicController.delete);

module.exports = router;