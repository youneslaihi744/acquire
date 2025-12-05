// controllers/acquireController.js
require("dotenv").config();

const KUNNA_URL = process.env.KUNNA_URL;

const ALIAS = process.env.ALIAS;

const Acquire = require('../mongoDB');

const Fetch=require('../services/Fetch');


function health(req, res) {
  res.json({
    status: "ok",
    service: "acquire"
  });
}
async function doAcquire(req, res) {
  const fecha = new Date();
  const hora = fecha.getHours(); // 0–23

  let start = new Date();
  let end = new Date();

  if (hora < 23) {
    start.setDate(fecha.getDate() - 4);
    end.setDate(fecha.getDate() - 1);
  } else {
    start.setDate(fecha.getDate() - 3);
  }

  try {
    // Llamada a Kunna
    const results = await Fetch.fetchKunna(start, end);

    // Respondemos en JSON
    res.status(200).json({
      start: start.toISOString(),
      end: end.toISOString(),
      results
    });
  } catch (err) {
    console.error("Error al obtener datos de Kunna:", err);
    res.status(500).json({ error: "Failed to fetch data from Kunna" });
  }

}
module.exports = {
  health,
  doAcquire
};