const mongoose = require('mongoose');
require("dotenv").config();
// Conectar a MongoDB
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conexión a la base de datos establecida');
    }).catch(err => {
        console.error('Error de conexión a la base de datos:', err);
    });

const Schema = mongoose.Schema;
const AcquireSchema = new Schema({
    feature: { type: Array, required: true },
    fecha: {type: Date, required: true}
});

module.exports = mongoose.model('Acquire', AcquireSchema);