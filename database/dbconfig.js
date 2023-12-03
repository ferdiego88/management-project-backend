const mongoose = require('mongoose');

const dbConnection = async ()  => {
    try {
        
        await mongoose.connect(process.env.DB_CNN);

        console.log('Conexion de la Base de Datos exitosa');

    } catch (error) {
        throw new Error('Error en la conexion a la Base de Datos')
    }
}

module.exports = {
    dbConnection
}