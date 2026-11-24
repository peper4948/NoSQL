const express = require('express');
const router = express.Router();
const ReporteCampo = require('../models/reportesCampo');

router.get('/', async (req, res) => {
    try {
        const datos = await ReporteCampo.find();
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const datos = await ReporteCampo.findById(req.params.id);
        if (!datos) {
            return res.status(404).json({ mensaje: 'Reporte de campo no encontrado' });
        }
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const datos = new ReporteCampo(req.body);
        const guardado = await datos.save();
        return res.status(201).json({
            mensaje: 'Reporte de campo creado correctamente',
            data: guardado
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const datos = await ReporteCampo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );
        if (!datos) {
            return res.status(404).json({ mensaje: 'Reporte de campo no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Reporte de campo actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const datos = await ReporteCampo.findByIdAndDelete(req.params.id);
        if (!datos) {
            return res.status(404).json({ mensaje: 'Reporte de campo no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Reporte de campo eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;
