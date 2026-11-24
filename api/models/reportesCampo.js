const mongoose = require('mongoose');

const ReporteCampoSchema = new mongoose.Schema({
    idReporteCampo: { type: Number, required: true, unique: true },
    fecha: { type: Date, required: true },
    colaborador: { type: String, required: true },
    provincia: { type: String, required: true },
    actividad: { type: String, required: true },
    descripcion: { type: String, required: true }
});

module.exports = mongoose.model('ReporteCampo', ReporteCampoSchema, 'ReportesCampo');
