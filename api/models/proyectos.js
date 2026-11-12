const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
    descripcion: {
        type: String
    },
    estado: {
        type: String
    },
    fechaFin: {
        type: Date
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fotografias: {
        type: [String]
    },
    idCoordinador: {
        type: Number,
        required: true
    },
    idProyecto: {
        type: Number,
        required: true,
        unique: true
    },
    idZona: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    objetivos: {
        type: [String]
    },
    provincia: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema, 'Proyectos');