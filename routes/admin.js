const express = require('express');
const router = express.Router();
var auth = require('../middlewares/auth');
//Importo modelo de datos
const adminController = require('../controllers/admin');

router.post('/signin', adminController.signIn);

router.delete('/logout', auth, adminController.logout);

module.exports = router;