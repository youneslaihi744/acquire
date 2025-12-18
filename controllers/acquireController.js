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
  let results;
  try {
    // Llamada a Kunna
    results = await Fetch.fetchKunna(start, end);
  } catch (err) {
    console.error("Error al obtener datos de Kunna:", err);
    res.status(502).json({ error: "Failed to fetch data from Kunna" });
  }
  const features=[results.values[0][2],results.values[1][2],results.values[2][2],hora,fecha.getDay(),fecha.getMonth(),fecha.getDate()];
  let MongoSave = new Acquire({
      feature:features,
      fecha:fecha
    });
    MongoSave.save()
      .then(id => {
        console.log('Se ha guardado Correctamente');
        res.status(201).json({
          dataId:id._id,
          features,
          featureCount:7,
          scalerVersion:'v1',
          createdAt:fecha

        });
      }).catch(err => {
        console.error('Error de guardar en DB:', err);
        res.status(500).json({error:"Error al procesar o guardar en MongoDB."
        });
      });

}
module.exports = {
  health,
  doAcquire
};