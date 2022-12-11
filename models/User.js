const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }


//this Cambia el nombre de la coleccion ( por defecto es: el nombre de mi esquema + s )

}, { collection: 'CalendarUsers' });

// User va a ser el nombre de mi coleccion en mi DB
module.exports = model('User', UserSchema)