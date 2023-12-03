require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const { dbConnection } = require('./database/dbconfig');
const cors = require('cors');

app.use(cors());

dbConnection();

app.get('/', (req, res) => {

  res.json({

    ok:true,
    respuesta:"Hola Mundo"
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})