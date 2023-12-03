const { response } = require('express');
const User = require('../models/usuarioModel');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await User.findOne({email});


        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }


        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'password no valido'
            })
        }

        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok:true,
            token,
            msg: 'Login'
        })
        
    } catch (error) {
    res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador'
    })
    }
}

module.exports = {
    login
}