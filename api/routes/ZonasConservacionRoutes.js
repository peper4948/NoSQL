const express = require('express');
const router = express.Router();
const ZonaConservacion = require('../models/zonasConservacion');

//GET
router.get('/', async (req, res) => {
    try {
        const zonas = await ZonaConservacion.find().sort({ idZona: 1 });

        if (zonas.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron zonas de conservación" });
        }

        res.json(zonas);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS (van antes de las rutas /:id) =====

// 1. Zonas por provincia
router.get("/provincia/:provincia", async (req, res) => {
    try {
        const { provincia } = req.params;

        const resultado = await ZonaConservacion.find({
            provincia: provincia
        });

        if (resultado.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontraron zonas para esa provincia"
            });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al buscar",
            error: error.message
        });
    }
});


// ===== CRUD por id (siempre de último) =====

//GET ID
router.get("/:id", async (req, res) => {
    try {
        const zona = await ZonaConservacion.findById(req.params.id);

        if (!zona) {
            return res.status(404).json({
                mensaje: "Zona de conservación no encontrada"
            });
        }

        res.json(zona);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});


//POST
router.post("/", async (req, res) => {
    const zona = new ZonaConservacion(req.body);

    try {
        const nueva = await zona.save();
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});


//PUT ID
router.put("/:id", async (req, res) => {
    try {
        const zona = await ZonaConservacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!zona) {
            return res.status(404).json({
                mensaje: "Zona de conservación no encontrada"
            });
        }

        return res.status(200).json({
            mensaje: "Zona de conservación actualizada correctamente"
        });
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});


//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const zona = await ZonaConservacion.findByIdAndDelete(req.params.id);

        if (!zona) {
            return res.status(404).json({
                mensaje: "Zona de conservación no encontrada"
            });
        }

        return res.status(200).json({
            mensaje: "Zona de conservación eliminada correctamente"
        });
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});

module.exports = router;