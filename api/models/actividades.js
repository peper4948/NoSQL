const mongoose = require('mongoose');

const ActividadSchema = new mongoose.Schema({
    cupoMaximo: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String
    },
    fecha: {
        type: Date,
        required: true
    },
    idActividad: {
        type: Number,
        required: true,
        unique: true
    },
    idProyecto: {
        type: Number,
        required: true
    },
    idResponsable: {
        type: Number,
        required: true
    },
    idZona: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Actividad', ActividadSchema, 'Actividades');