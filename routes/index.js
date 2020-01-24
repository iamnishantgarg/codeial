const express = require("express");
const home_controller = require("../controllers/home_Constroller");
const authenticator = require("../config/authenticator");
const router = express.Router();

router.get("/", home_controller.home);
router.use("/users", require("./user"));
router.use("/posts", require("./post"));

module.exports = router;
