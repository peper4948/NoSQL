const mongoose = require('mongoose');

const ZonasConservacionSchema = new mongoose.Schema({
    activa: {
        type: Boolean,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    idZona: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    ubicacion: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model(
    'ZonaConservacion',
    ZonasConservacionSchema,
    'ZonasConservacion'
);