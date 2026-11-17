const mongoose = require('mongoose');

const ObservacionesEspeciesSchema = new mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    idObservacion: {
        type: Number,
        required: true,
        unique: true
    },
    provincia: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    'ObservacionEspecie',
    ObservacionesEspeciesSchema,
    'ObservacionesEspecies'
);