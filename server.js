// server.js
// Entry point del servicio PREDICT
require("dotenv").config();

const express = require("express");
const path = require("path");
const acquireRoutes = require("./routes/acquireRoutes");


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());



// Rutas del servicio PREDICT
app.use("/", acquireRoutes);

// Arranque del servidor + carga del modelo
app.listen(PORT, async () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`[ACQUIRE] Servicio escuchando en ${serverUrl}`);
});