const express = require("express");
const router = express.Router();
const controller = require("../controllers/seriesController");
const { authenticateToken } = require("../middleware/auth");

// Registro de usuário
router.post("/register", controller.register);

// Login de usuário
router.post("/login", controller.login);

// Registro de série
router.post("/series", authenticateToken, controller.createSeries);

// Atualizar série
router.put("/series/:id", authenticateToken, controller.updateSeries);

// Listar séries do usuário
router.get("/series", authenticateToken, controller.listSeries);

// Deletar série
router.delete("/series/:id", authenticateToken, controller.deleteSeries);

module.exports = router;
