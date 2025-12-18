// controllers/OrquestatorController.js
require("dotenv").config();

const Fetch=require('../services/Fetch');


function health(req, res) {
  res.json({
    status: "ok",
    service: "orquestator"
  });
}
async function run(req, res) {
  try{
  const response= await Fetch.callservices();
  res.status(200).json(response);
  console.log('Se ha realizado correctamente la prediccion');
  } catch(err){
    console.error("Error al hacer llamadas a los servicios", err)
    res.status(502).json({ error: "Failed to fetch data from Kunna or predict from Prediction" });
  }

}
module.exports = {
  health,
  run
};