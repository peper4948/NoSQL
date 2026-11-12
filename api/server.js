require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/usuarios', require('./routes/UsuariosRoutes'));
app.use('/api/proyectos', require('./routes/ProyectoRoutes'));
app.use('/api/avances', require('./routes/AvancesRoutes'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("BD conectada");
        app.listen(PORT, () => {
            console.log(`Serve API http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con la BD", error);
    });