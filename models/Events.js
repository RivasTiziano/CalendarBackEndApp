const { Schema, model } = require('mongoose');

const EventsSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
//this Cambia el nombre de la coleccion ( por defecto es: el nombre de mi esquema + s )
{ collection: 'CalendarEvents' });

EventsSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

// User va a ser el nombre de mi coleccion en mi DB
module.exports = model('Event', EventsSchema)