const express = require('express');
const router = express.Router();
const Donante = require('../models/donantes');

router.get('/', async (req, res) => {
    try {
        const datos = await Donante.find();
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const datos = await Donante.findById(req.params.id);
        if (!datos) {
            return res.status(404).json({ mensaje: 'Donante no encontrado' });
        }
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const datos = new Donante(req.body);
        const guardado = await datos.save();
        return res.status(201).json({
            mensaje: 'Donante creado correctamente',
            data: guardado
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const datos = await Donante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );
        if (!datos) {
            return res.status(404).json({ mensaje: 'Donante no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Donante actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const datos = await Donante.findByIdAndDelete(req.params.id);
        if (!datos) {
            return res.status(404).json({ mensaje: 'Donante no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Donante eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;
