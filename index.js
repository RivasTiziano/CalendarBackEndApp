const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const cors = require('cors');
const path = require('path');

//this Crea servidor express o express app
const app = express();

//this Conecta Base de datos
dbConnection();

//this Configura el CORS
app.use( cors() )

//this Directorio Publico
app.use( express.static('public') );

//this Lectura y parseo del body
app.use( express.json() );

//this Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );


app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//this Esuchar Peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
})