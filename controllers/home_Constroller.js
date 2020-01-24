const Post = require("../models/post");

exports.home = (req, res, next) => {
  Post.find({})
    .populate("user")
    .exec((err, posts) => {
      if (err) {
        console.log("error");
        return;
      }
      return res.render("home", { title: "Home", posts });
    });
};
