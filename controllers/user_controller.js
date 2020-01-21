const User = require("../models/user");

// exports.

exports.signIn = (req, res, next) => {
  res.render("user_sign_in", { title: "Codeial:sign-In" });
};

exports.signUp = (req, res, next) => {
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
  return res.redirect("/");
};
