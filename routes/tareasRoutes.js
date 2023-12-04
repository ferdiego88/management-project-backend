const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validarJwt } = require('../middlewares/validarJwt');
const { createTask, getTasks, updateTask, getTaskByUser } = require('../controllers/tareasController');

const router = Router();

router.get('/',validarJwt, getTasks);
router.get('/:id',validarJwt, getTaskByUser);

router.post('/', 
[   validarJwt,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('usuarioId', 'El id del usuario debe ser valid').isMongoId(),
    check('proyectoId', 'El id del proyecto debe ser valid').isMongoId(),
    validateFields
],
 createTask);

 
router.put('/:id', 
[
], updateTask);


module.exports = router;