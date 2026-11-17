const express = require('express');
const router = express.Router();
const RegistroResiduo = require('../models/registrosResiduos');

//GET
router.get('/', async (req, res) => {
    try {
        const registros = await RegistroResiduo.find().sort({ idRegistroResiduo: 1 });

        if (registros.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron registros de residuos" });
        }

        res.json(registros);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS (van antes de las rutas /:id) =====

// 1. Registros por tipo de residuo
router.get("/tipo/:tipo", async (req, res) => {
    try {
        const { tipo } = req.params;

        const resultado = await RegistroResiduo.find({
            tipoResiduo: tipo
        });

        if (resultado.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontraron registros para ese tipo de residuo"
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
        const registro = await RegistroResiduo.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({
                mensaje: "Registro de residuo no encontrado"
            });
        }

        res.json(registro);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});


//POST
router.post("/", async (req, res) => {
    const registro = new RegistroResiduo(req.body);

    try {
        const nuevo = await registro.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});


//PUT ID
router.put("/:id", async (req, res) => {
    try {
        const registro = await RegistroResiduo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!registro) {
            return res.status(404).json({
                mensaje: "Registro de residuo no encontrado"
            });
        }

        return res.status(200).json({
            mensaje: "Registro de residuo actualizado correctamente"
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
        const registro = await RegistroResiduo.findByIdAndDelete(req.params.id);

        if (!registro) {
            return res.status(404).json({
                mensaje: "Registro de residuo no encontrado"
            });
        }

        return res.status(200).json({
            mensaje: "Registro de residuo eliminado correctamente"
        });
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});

module.exports = router;