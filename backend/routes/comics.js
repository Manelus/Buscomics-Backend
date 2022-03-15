const express = require('express');
const router = express.Router();
//Importo modelo de datos
const ComicController = require('../controllers/comics');
// End-points CRUD 
router.get('/', ComicController.getAll);
router.get('/:nombre', ComicController.getByName);
router.get('/:autor', ComicController.getByType);
router.post('/', ComicController.create);
router.put('/:id', ComicController.update);
router.delete('/', ComicController.deleteAll);
router.delete('/:nombre', ComicController.delete);

module.exports = router;