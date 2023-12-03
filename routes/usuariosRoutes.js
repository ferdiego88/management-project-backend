const { Router } = require('express');
const { getUsuarios} = require('../controllers/usuariosController');

const router = Router();

router.get('/', getUsuarios);

module.exports = router;