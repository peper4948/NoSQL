const mongoose = require('mongoose');

const AvancesSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    fotografias: {
        type: [String]
    },
    idAvance: {
        type: Number,
        required: true,
        unique: true
    },
    idProyecto: {
        type: Number,
        required: true
    },
    idUsuario: {
        type: Number,
        required: true
    },
    porcentaje: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

module.exports = mongoose.model('AvanceProyecto', AvancesSchema, 'AvancesProyecto');