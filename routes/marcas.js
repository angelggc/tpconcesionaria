const express = require("express");
const router = express.Router();

const marcasController = require("../controller/marcasController")

router.get("/", marcasController.index)
router.get("/:marca", marcasController.index)

module.exports = router;