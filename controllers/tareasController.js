const { response } = require('express');
const Task = require('../models/tareasModel');

const getTasks = async (req, res = response) => {

    const tareas = await Task.find()
                                    .populate('usuario', 'nombre')
                                    .populate('proyecto', 'nombre');

    res.json({
        ok: true,
        tareas,
        uid: req.uid
    })

}


const getTaskByUser = async (req, res = response) => {

    const uid = req.params.id;

    console.log(uid);

    const tareas = await Task.find({usuario:uid})
                                .populate('usuario', 'nombre')
                                .populate('proyecto', 'nombre');

    res.json({
        ok: true,
        tareas,
        uid: req.uid
    })

}


const createTask = async (req, res = response) => {
    
    const {usuarioId, proyectoId} = req.body;
    
    const task = new Task({
        usuario: usuarioId,
        proyecto: proyectoId,
        ...req.body
    });


    try {
      
        const taskDB = await task.save();
        
        res.json({
            ok: true,
            tarea: taskDB,
        })

    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })

        
    }
}

const updateTask = async (req, res = response) => {

    const uid = req.params.id;
    console.log(uid);
    try {

        const tareaBD = await Task.findById(uid);

        if (!tareaBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la tarea'
            })
        }

        const { proyecto, usuario, ...fields} = req.body;


        const tareaActualizada = await Task.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok:true,
            tarea: tareaActualizada
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    getTasks,
    createTask,
    updateTask,
    getTaskByUser,
}