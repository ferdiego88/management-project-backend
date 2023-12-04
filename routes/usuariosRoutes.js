const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { getUsers, createUser, updateUser, deleteUser} = require('../controllers/usuariosController');
const { validarJwt } = require('../middlewares/validarJwt');

const router = Router();

router.get('/',validarJwt, getUsers);

router.post('/', 
[   
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
],
 createUser);

 router.put('/:id',
 [ validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
]
 , updateUser);

 router.delete('/:id',validarJwt,deleteUser);

module.exports = router;