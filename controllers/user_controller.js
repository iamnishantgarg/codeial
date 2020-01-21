const User = require("../models/user");

exports.profile = (req, res, next) => {
  res.send("<h1>user profile</h1>");
};

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
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log("error in finding user:" + err);
      return res.redirect("back");
    }
    if (user) {
      if (user.password == password) {
        res.cookie("user-id", user.id);
        return res.redirect("/users/profile");
      } else {
        console.log("password is incorrect");
        return res.redirect("back");
      }
    } else {
      return res.redirect("/users/sign-up");
    }
  });
};
