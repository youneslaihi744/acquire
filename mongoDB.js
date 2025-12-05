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
const PredictSchema = new Schema({
    result: { type: Number, required: true },
    timestamp: String,
});

module.exports = mongoose.model('Predict', PredictSchema);