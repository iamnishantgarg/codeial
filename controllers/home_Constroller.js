const Post = require("../models/post");
const User = require("../models/user");

exports.home = (req, res, next) => {
  Post.find({})
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } })
    .exec((err, posts) => {
      if (err) {
        console.log("error");
        return;
      }
      User.find({}, (err, users) => {
        if (err) {
          console.log(err);
          return;
        } else {
          return res.render("home", { title: "Home", posts, all_users: users });
        }
      });
    });
};
