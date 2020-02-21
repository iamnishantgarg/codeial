const Post = require("../models/post");
const Comment = require("../models/comment");
exports.createPost = async (req, res, next) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
      comments: []
    });
    req.flash("success", "post created successfully!");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", "post cannot be created");
    console.log(error);
    return res.redirect("back");
  }
};

exports.destroy = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
    }
    await Comment.deleteMany({ post: req.params.id });
    req.flash("success", "post and associated comments deleted successfully!");

    return res.redirect("/");
  } catch (error) {
    req.flash("error", "cannot delete post!");

    console.log(error);
    return res.redirect("back");
  }
};
