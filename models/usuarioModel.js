const { Schema, model } = require( 'mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true,
        default:'USER_ROLE'
    }
});

module.exports = model('Usuario', UsuarioSchema);