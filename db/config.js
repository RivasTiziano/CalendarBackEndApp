const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB Online')
        
    } catch (error) {
        console.log(error)
        throw new Error('No se puede inicializar la BD Mongo')
    }

}

module.exports = {
    dbConnection
}