const mongoose = require('mongoose');

const InscripcionSchema = new mongoose.Schema({
    comentario: {
        type: String
    },
    estado: {
        type: String
    },
    fechaInscripcion: {
        type: Date,
        required: true
    },
    idActividad: {
        type: Number,
        required: true
    },
    idInscripcion: {
        type: Number,
        required: true,
        unique: true
    },
    idUsuario: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Inscripcion', InscripcionSchema, 'Inscripciones');