const router = require("express").Router();
const authenticator = require("../config/authenticator");
const post_controller = require("../controllers/post_controller");

router.post(
  "/create",
  authenticator.checkAuthentication,
  post_controller.createPost
);
router.get(
  "/destroy/:id",
  authenticator.checkAuthentication,
  post_controller.destroy
);
module.exports = router;
