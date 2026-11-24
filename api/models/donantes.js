const mongoose = require('mongoose');

const DonanteSchema = new mongoose.Schema({
    idDonante: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    tipoDonante: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    montoDonacion: { type: Number, required: true },
    moneda: { type: String, required: true },
    fechaDonacion: { type: Date, required: true },
    idProyecto: { type: Number, required: true },
    activo: { type: Boolean, required: true }
});

module.exports = mongoose.model('Donante', DonanteSchema, 'Donantes');
