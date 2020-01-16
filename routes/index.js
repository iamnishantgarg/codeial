const express = require("express");
const home_controller = require("../controllers/home_Constroller");
const router = express.Router();

router.get("/", home_controller.home);

module.exports = router;
