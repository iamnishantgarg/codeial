const User = require("../models/user");

exports.profile = (req, res, next) => {
  var id = req.cookies.user_id;
  if (id) {
    console.log("is found");

    User.findOne({ _id: id }, (err, user) => {
      if (user) {
        console.log("user found");

        return res.render("user_profile", { user, title: "user-profile" });
      } else {
        console.log("user not found");

        return res.redirect("back");
      }
    });
  } else {
    console.log("user id not found");
    return res.redirect("back");
  }
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
        res.cookie("user_id", user.id);
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

exports.endSession = (req, res, next) => {
  if (req.cookies.user_id) {
    res.clearCookie("user_id");
    return res.redirect("/users/sign-in");
  } else {
    return res.redirect("/");
  }
};
