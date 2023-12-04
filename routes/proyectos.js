const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validarJwt } = require('../middlewares/validarJwt');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/proyectosController');

const router = Router();

router.get('/',validarJwt, getProjects);

router.post('/', 
[   validarJwt,
    check('nombre', 'El nombre del proyecto es necesario').not().isEmpty(),
    validateFields
],
 createProject);

 router.put('/:id',
 [ validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
]
 , updateProject);

 router.delete('/:id',validarJwt,deleteProject);

module.exports = router;