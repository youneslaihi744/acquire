// routes/OrquestatorRoutes.js
const express = require("express");
const router = express.Router();

const OrquestatorController = require("../controllers/OrquestatorController");

// Contrato del servicio
router.get("/health", OrquestatorController.health);
router.post("/run", OrquestatorController.run);

module.exports = router;