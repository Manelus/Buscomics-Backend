// const ComicRouter = require('./routes/comics');
const TiendaRouter = require('./routes/tiendas');
const router = require('express').Router();

//Rutas
// router.use('/comics', ComicRouter);
router.use('/tienda', TiendaRouter);

module.exports = router;