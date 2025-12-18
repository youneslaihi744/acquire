// server.js
// Entry point del servicio PREDICT
require("dotenv").config();

const express = require("express");
const path = require("path");
const OrquestatorRoutes = require("./routes/OrquestatorRoutes");


const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());




app.use("/", OrquestatorRoutes);


app.listen(PORT, async () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`[ORQUISTATOR] Servicio escuchando en ${serverUrl}`);
});