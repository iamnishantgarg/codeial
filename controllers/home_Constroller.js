const Post = require("../models/post");
const User = require("../models/user");

exports.home = async (req, res, next) => {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });
    let users = await User.find({});
    return res.render("home", { title: "Home", posts, all_users: users });
  } catch (error) {
    console.log(error);
    return;
  }
};
