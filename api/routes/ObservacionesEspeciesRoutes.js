const express = require('express');
const router = express.Router();
const ObservacionEspecie = require('../models/observacionesEspecies');

//GET
router.get('/', async (req, res) => {
    try {
        const observaciones = await ObservacionEspecie.find().sort({ idObservacion: 1 });

        if (observaciones.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron observaciones" });
        }

        res.json(observaciones);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS (van antes de las rutas /:id) =====

// 1. Observaciones por especie
router.get("/especie/:especie", async (req, res) => {
    try {
        const { especie } = req.params;

        const resultado = await ObservacionEspecie.find({
            especie: especie
        });

        if (resultado.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontraron observaciones para esa especie"
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
        const observacion = await ObservacionEspecie.findById(req.params.id);

        if (!observacion) {
            return res.status(404).json({ mensaje: "Observación no encontrada" });
        }

        res.json(observacion);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//POST
router.post("/", async (req, res) => {
    const observacion = new ObservacionEspecie(req.body);

    try {
        const nueva = await observacion.save();
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//PUT ID
router.put("/:id", async (req, res) => {
    try {
        const observacion = await ObservacionEspecie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!observacion) {
            return res.status(404).json({ mensaje: "Observación no encontrada" });
        }

        return res.status(200).json({
            mensaje: "Observación actualizada correctamente"
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const observacion = await ObservacionEspecie.findByIdAndDelete(req.params.id);

        if (!observacion) {
            return res.status(404).json({ mensaje: "Observación no encontrada" });
        }

        return res.status(200).json({
            mensaje: "Observación eliminada correctamente"
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;