const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    activo: {
        type: Boolean,
        default: true
    },
    contra: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    idUsuario: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema, 'Usuarios');