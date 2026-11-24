const mongoose = require('mongoose');

const ReporteCiudadanoSchema = new mongoose.Schema({
    idReporteCiudadano: { type: Number, required: true, unique: true },
    fecha: { type: Date, required: true },
    ciudadano: { type: String, required: true },
    provincia: { type: String, required: true },
    tipo_reporte: { type: String, required: true },
    descripcion: { type: String, required: true }
});

module.exports = mongoose.model('ReporteCiudadano', ReporteCiudadanoSchema, 'ReportesCiudadanos');
