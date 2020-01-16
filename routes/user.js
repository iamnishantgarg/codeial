const router = require("express").Router();
const user_controller = require("../controllers/user_controller");
router.get("/profile", user_controller.profile);
module.exports = router;
