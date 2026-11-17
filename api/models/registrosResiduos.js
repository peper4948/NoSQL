const mongoose = require('mongoose');

const RegistrosResiduosSchema = new mongoose.Schema({
    cantidadKg: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaRecoleccion: {
        type: Date,
        required: true
    },
    idProyecto: {
        type: Number,
        required: true
    },
    idRegistroResiduo: {
        type: Number,
        required: true,
        unique: true
    },
    idUsuario: {
        type: Number,
        required: true
    },
    idZona: {
        type: Number,
        required: true
    },
    tipoResiduo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    'RegistroResiduo',
    RegistrosResiduosSchema,
    'RegistrosResiduos'
);