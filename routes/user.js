const router = require("express").Router();
const passport = require("passport");
const authenticator = require("../config/authenticator");
const user_controller = require("../controllers/user_controller");
router.get(
  "/profile/:id",
  authenticator.checkAuthentication,

  user_controller.userProfile
);
router.post("/update/:id", user_controller.update);
router.get("/sign-in", user_controller.signIn);
router.get("/sign-out", user_controller.endSession);
router.get("/sign-up", user_controller.signUp);
router.post("/create", user_controller.createUser);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in"
  }),
  user_controller.createSession
);
module.exports = router;
