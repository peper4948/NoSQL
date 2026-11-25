const express = require('express');
const router = express.Router();
const Actividad = require('../models/actividades');

// GET
router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.find().sort({ idActividad: 1 });
        if (actividades.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron actividades" });
        }
        res.json(actividades);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS =====

// 1. Actividades por estado (PROGRAMADA, FINALIZADA, CANCELADA)
router.get("/estado/:estado", async (req, res) => {
    try {
        const { estado } = req.params;
        const resultado = await Actividad.find({ estado: estado.toUpperCase() });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron actividades con ese estado" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar", error: error.message });
    }
});


// 2. Actividades por tipo
router.get("/tipo/:tipo", async (req, res) => {
    try {
        const { tipo } = req.params;
        const resultado = await Actividad.find({ tipo: { $regex: new RegExp(`^${tipo}$`, "i") } });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron actividades de ese tipo" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar", error: error.message });
    }
});


// ===== CRUD por id =====

// GET ID
router.get("/:id", async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id);
        if (!actividad) {
            return res.status(404).json({ mensaje: "Actividad no encontrada" });
        }
        res.json(actividad);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// POST
router.post("/", async (req, res) => {
    const actividad = new Actividad(req.body);
    try {
        const nuevo = await actividad.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// PUT ID
router.put("/:id", async (req, res) => {
    try {
        const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        if (!actividad) {
            return res.status(404).json({ mensaje: "Actividad no encontrada" });
        }
        return res.status(200).json({ mensaje: "Actividad actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const actividad = await Actividad.findByIdAndDelete(req.params.id);
        if (!actividad) {
            return res.status(404).json({ mensaje: "Actividad no encontrada" });
        }
        return res.status(200).json({ mensaje: "Actividad eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;