const express = require('express');
const router = express.Router();
const ReporteCiudadano = require('../models/reportesCiudadanos');

router.get('/', async (req, res) => {
    try {
        const datos = await ReporteCiudadano.find();
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const datos = await ReporteCiudadano.findById(req.params.id);
        if (!datos) {
            return res.status(404).json({ mensaje: 'Reporte ciudadano no encontrado' });
        }
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const datos = new ReporteCiudadano(req.body);
        const guardado = await datos.save();
        return res.status(201).json({
            mensaje: 'Reporte ciudadano creado correctamente',
            data: guardado
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const datos = await ReporteCiudadano.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );
        if (!datos) {
            return res.status(404).json({ mensaje: 'Reporte ciudadano no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Reporte ciudadano actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const datos = await ReporteCiudadano.findByIdAndDelete(req.params.id);
        if (!datos) {
            return res.status(404).json({ mensaje: 'Reporte ciudadano no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Reporte ciudadano eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;
