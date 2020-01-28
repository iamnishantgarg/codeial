const router = require("express").Router();
const authenticator = require("../config/authenticator");
const comment_controller = require("../controllers/comment_controller");

router.post(
  "/create",
  authenticator.checkAuthentication,
  comment_controller.create
);
router.get(
  "/destroy/:id",
  authenticator.checkAuthentication,
  comment_controller.destroy
);
module.exports = router;
