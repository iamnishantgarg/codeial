const User = require("../models/user");

exports.userProfile = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect("back");
    } else
      return res.render("user_profile", {
        title: "user-profile",
        profile_user: user
      });
  });
};

exports.signIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile/" + req.user.id);
  }
  res.render("user_sign_in", { title: "Codeial:sign-In" });
};

exports.signUp = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("user_sign_up", { title: "Codeial:sign-Up" });
};

exports.createUser = (req, res, next) => {
  const { name, password, confirm_password, email } = req.body;
  if (password != confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("error is finding user:" + err);
      res.redirect("back");
    }
    if (!user) {
      User.create({ name, email, password }, (err, usr) => {
        if (err) {
          console.log("error in cretaing user:" + err);
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      console.log("user already exists");
      return res.redirect("back");
    }
  });

  // res.redirect("/users/sign-up");
};
exports.createSession = (req, res, next) => {
  req.flash("success", "logged in successfully!");
  return res.redirect("/users/profile/" + req.user.id);
};
exports.endSession = (req, res, next) => {
  req.logout();
  req.flash("success", "logged out successfully!");

  return res.redirect("/");
};

exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (user) {
      return res.redirect("/");
    } else {
      return res.redirect("back");
    }
  });
};
