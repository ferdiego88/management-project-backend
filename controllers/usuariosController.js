const { response } = require('express');
const User = require('../models/usuarioModel');

const getUsers = async (req, res = response) => {

    const usuarios = await User.find({}, 'nombre email');

    res.json({
        ok: true,
        usuarios
    })

}

const createUsers = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const buscarExistenciaEmail = await User.findOne({email});

        if (buscarExistenciaEmail) {

            return res.status(400).json({
                ok: false,
                msg: 'El correo esta registrado'
            })
        }

        const user = new User(req.body);
    
        await user.save();
        
        res.json({
            ok: true,
            user,
            msg: 'Usuario Creado'
        })

    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })

        
    }
}

module.exports = {
    getUsers,
    createUsers
}