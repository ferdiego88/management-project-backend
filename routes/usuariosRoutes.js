const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { getUsers, createUsers} = require('../controllers/usuariosController');

const router = Router();

router.get('/', getUsers);
router.post('/', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
],
 createUsers);

module.exports = router;