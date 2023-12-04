const { Schema, model } = require( 'mongoose');

const TareaSchema = Schema ({
    
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado:{
        type: String,
        required:true,
        default:'TODO'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
}, {collection: 'tareas' });

TareaSchema.method('toJSON', function () {
    
    const {__v, _id ,...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Tarea', TareaSchema);