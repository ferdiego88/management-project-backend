const { response } = require('express');
const User = require('../models/usuarioModel');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsers = async (req, res = response) => {

    const usuarios = await User.find({}, 'nombre email');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })

}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const buscarExistenciaEmail = await User.findOne({email});

        if (buscarExistenciaEmail) {

            return res.status(400).json({
                ok: false,
                msg: 'El correo esta registrado'
            })
        }

        const user = new User(req.body);
    
        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync(password,salt);
        
        await user.save();

        
        const token = await generarJWT(user.id);

        
        res.json({
            ok: true,
            user,
            token,
            msg: 'Usuario Creado'
        })

    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })

        
    }
}

const updateUser = async (req, res = response) => {

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

const deleteUser = async (req, res = response) => {

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
    getUsers,
    createUser,
    updateUser,
    deleteUser
}