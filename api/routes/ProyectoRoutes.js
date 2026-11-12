const express = require('express');
const router = express.Router();
const Proyecto = require('../models/proyectos');
//GET
router.get('/', async (req, res) => {
    try {
        const proyectos = await Proyecto.find().sort({ idProyecto: 1 });
        if (proyectos.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron proyectos" });
        }
        res.json(proyectos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS (van antes de las rutas /:id) =====

// 1. Proyectos por estado (ACTIVO, EN_PAUSA, FINALIZADO)
router.get("/estado/:estado", async (req, res) => {
    try {
        const { estado } = req.params;
        const resultado = await Proyecto.find({ estado: estado.toUpperCase() });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron proyectos con ese estado" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar", error: error.message });
    }
});


// 2. Proyectos por provincia
router.get("/provincia/:provincia", async (req, res) => {
    try {
        const { provincia } = req.params;
        const resultado = await Proyecto.find({ provincia: { $regex: new RegExp(`^${provincia}$`, "i") } });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron proyectos en esa provincia" });
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
        const proyecto = await Proyecto.findById(req.params.id);
        if (!proyecto) {
            return res.status(404).json({ mensaje: "Proyecto no encontrado" });
        }
        res.json(proyecto);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//POST
router.post("/", async (req, res) => {
    const proyecto = new Proyecto(req.body);
    try {
        const nuevo = await proyecto.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//PUT ID
router.put("/:id", async (req, res) => {
    try {
        const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        if (!proyecto) {
            return res.status(404).json({ mensaje: "Proyecto no encontrado" });
        }
        return res.status(200).json({ mensaje: "Proyecto actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
        if (!proyecto) {
            return res.status(404).json({ mensaje: "Proyecto no encontrado" });
        }
        return res.status(200).json({ mensaje: "Proyecto eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;