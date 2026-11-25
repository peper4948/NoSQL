const express = require('express');
const router = express.Router();
const Inscripcion = require('../models/inscripciones');
// GET
router.get('/', async (req, res) => {
    try {
        const inscripciones = await Inscripcion.find().sort({ idInscripcion: 1 });
        if (inscripciones.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron inscripciones" });
        }
        res.json(inscripciones);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS =====

// 1. Inscripciones por estado (ASISTIO, NO_ASISTIO, CONFIRMADA, PENDIENTE, CANCELADA)
router.get("/estado/:estado", async (req, res) => {
    try {
        const { estado } = req.params;
        const resultado = await Inscripcion.find({ estado: estado.toUpperCase() });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron inscripciones con ese estado" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar", error: error.message });
    }
});


// 2. Inscripciones por actividad
router.get("/actividad/:idActividad", async (req, res) => {
    try {
        const { idActividad } = req.params;
        const resultado = await Inscripcion.find({ idActividad: idActividad });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron inscripciones para esa actividad" });
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
        const inscripcion = await Inscripcion.findById(req.params.id);
        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripción no encontrada" });
        }
        res.json(inscripcion);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// POST
router.post("/", async (req, res) => {
    const inscripcion = new Inscripcion(req.body);
    try {
        const nuevo = await inscripcion.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// PUT ID
router.put("/:id", async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripción no encontrada" });
        }
        return res.status(200).json({ mensaje: "Inscripción actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByIdAndDelete(req.params.id);
        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripción no encontrada" });
        }
        return res.status(200).json({ mensaje: "Inscripción eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;