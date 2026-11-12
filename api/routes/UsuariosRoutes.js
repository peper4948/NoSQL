const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');
//GET
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-contra').sort({ idUsuario: 1 });
        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron usuarios" });
        }
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// ===== CONSULTAS (van antes de las rutas /:id) =====

// 1. Usuarios por rol (ADMIN, COORDINADOR, CAMPO, VOLUNTARIO, CIUDADANO)
router.get("/rol/:rol", async (req, res) => {
    try {
        const { rol } = req.params;
        const resultado = await Usuario.find({ rol: rol.toUpperCase() }).select('-contra');

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron usuarios con ese rol" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar", error: error.message });
    }
});


// 2. Usuarios activos
router.get("/activos", async (req, res) => {
    try {
        const resultado = await Usuario.find({ activo: true }).select('-contra');

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron usuarios activos" });
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
        const usuario = await Usuario.findById(req.params.id).select('-contra');
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//POST
router.post("/", async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        const nuevo = await usuario.save();
        const { contra, ...usuario } = nuevo.toObject(); // no se devuelve la contraseña
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//PUT ID
router.put("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        return res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        return res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;