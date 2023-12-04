const { response } = require('express');
const Project = require('../models/proyectosModel');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getProjects = async (req, res = response) => {

    const proyectos = await Project.find({}, 'nombre');

    res.json({
        ok: true,
        proyectos,
        uid: req.uid
    })

}

const createProject = async (req, res = response) => {
    
    const uid = req.uid;
    
    const project = new Project({
        usuario: uid,
        ...req.body
    });


    try {
      
        const projectDB = await project.save();
        
        res.json({
            ok: true,
            proyecto: projectDB,
        })

    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })

        
    }
}

const updateProject = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario buscado'
            })
        }

        const { password,email, ...fields} = req.body;

        if(usuarioDB.email !== email) {
           
            const buscarExistenciaEmail = await User.findOne({email});

            if (buscarExistenciaEmail) {
                return  res.status(400).json({
                        ok:false,
                        msg: 'Ya un usuario con ese email'
                });
            }

        }

        fields.email = email;
        const usuarioActualizado = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}

const deleteProject = async (req, res = response) => {

const uid = req.params.id;

  try {

    const usuarioDB = await User.findById(uid);

    if (!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe el usuario buscado'
        })
    }

    await User.findByIdAndDelete(uid);
        
    res.json({
        ok:true,
        msg: 'Usuario Eliminado'
    })

  } catch (error) {

    res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador'
    })
  }

}


module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
}