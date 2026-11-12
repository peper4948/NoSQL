
const express = require('express');
const router = express.Router();
const AvanceProyecto = require('../models/avances');
//GET
router.get('/', async (req, res) => {
    try {
        const avances = await AvanceProyecto.find().sort({ idAvance: 1 });
        if (avances.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron avances" });
        }
        res.json(avances);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS (van antes de las rutas /:id) =====

// 1. Avances de un proyecto (por idProyecto), del más viejo al más reciente
router.get("/proyecto/:idProyecto", async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const resultado = await AvanceProyecto.find({ idProyecto: Number(idProyecto) }).sort({ fecha: 1 });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron avances para ese proyecto" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar", error: error.message });
    }
});


// ===== CRUD por id (siempre de último) =====

//GET ID
router.get("/:id", async (req, res) => {
    try {
        const avance = await AvanceProyecto.findById(req.params.id);
        if (!avance) {
            return res.status(404).json({ mensaje: "Avance no encontrado" });
        }
        res.json(avance);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//POST
router.post("/", async (req, res) => {
    const avance = new AvanceProyecto(req.body);
    try {
        const nuevo = await avance.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//PUT ID
router.put("/:id", async (req, res) => {
    try {
        const avance = await AvanceProyecto.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        if (!avance) {
            return res.status(404).json({ mensaje: "Avance no encontrado" });
        }
        return res.status(200).json({ mensaje: "Avance actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const avance = await AvanceProyecto.findByIdAndDelete(req.params.id);
        if (!avance) {
            return res.status(404).json({ mensaje: "Avance no encontrado" });
        }
        return res.status(200).json({ mensaje: "Avance eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;