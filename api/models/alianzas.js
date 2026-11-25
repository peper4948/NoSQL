const mongoose = require('mongoose');

const AlianzaSchema = new mongoose.Schema({
    contacto: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    estado: {
        type: String
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    idAlianza: {
        type: Number,
        required: true,
        unique: true
    },
    idProyecto: {
        type: Number,
        required: true
    },
    nombreOrganizacion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    tipoColaboracion: {
        type: String,
        required: true
    },
    tipoOrganizacion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Alianza', AlianzaSchema, 'Alianzas');