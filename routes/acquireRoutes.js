// routes/acquireRoutes.js
const express = require("express");
const router = express.Router();

const AcquireController = require("../controllers/acquireController");

// Contrato del servicio
router.get("/health", AcquireController.health);
router.post("/data", AcquireController.doAcquire);

module.exports = router;