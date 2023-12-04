require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const { dbConnection } = require('./database/dbconfig');
const cors = require('cors');

app.use(cors());

app.use(express.json());

dbConnection();

app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareasRoutes'));
app.use('/api/login', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})