const { Router } = require('express');

const { login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validarJwt } = require('../middlewares/validarJwt');

const router = Router();

router.post('/', 
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);


router.get('/renew', 
[  
    validarJwt
], renewToken);



module.exports = router;