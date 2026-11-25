const express = require('express');
const router = express.Router();
const Alianza = require('../models/alianzas');
// GET
router.get('/', async (req, res) => {
    try {
        const alianzas = await Alianza.find().sort({ idAlianza: 1 });
        if (alianzas.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron alianzas" });
        }
        res.json(alianzas);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS =====

// 1. Alianzas por estado (ACTIVA, FINALIZADA)
router.get("/estado/:estado", async (req, res) => {
    try {
        const { estado } = req.params;
        const resultado = await Alianza.find({ estado: estado.toUpperCase() });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron alianzas con ese estado" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar", error: error.message });
    }
});


// 2. Alianzas por tipo de organización
router.get("/tipo/:tipoOrganizacion", async (req, res) => {
    try {
        const { tipoOrganizacion } = req.params;
        const resultado = await Alianza.find({ tipoOrganizacion: tipoOrganizacion.toUpperCase() });

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron alianzas de ese tipo de organización" });
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
        const alianza = await Alianza.findById(req.params.id);
        if (!alianza) {
            return res.status(404).json({ mensaje: "Alianza no encontrada" });
        }
        res.json(alianza);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// POST
router.post("/", async (req, res) => {
    const alianza = new Alianza(req.body);
    try {
        const nuevo = await alianza.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// PUT ID
router.put("/:id", async (req, res) => {
    try {
        const alianza = await Alianza.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        if (!alianza) {
            return res.status(404).json({ mensaje: "Alianza no encontrada" });
        }
        return res.status(200).json({ mensaje: "Alianza actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const alianza = await Alianza.findByIdAndDelete(req.params.id);
        if (!alianza) {
            return res.status(404).json({ mensaje: "Alianza no encontrada" });
        }
        return res.status(200).json({ mensaje: "Alianza eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;