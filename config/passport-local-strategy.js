const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// auth using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          // console.log("error in finding user" + err);
          req.flash("error", err);
          return done(err);
        }
        if (!user || user.password != password) {
          // console.log("");
          req.flash("error", "invalid username/password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialize user to define cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializeUser here
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("error in finding user passport-->");
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;
