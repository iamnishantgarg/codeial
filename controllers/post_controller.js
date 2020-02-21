const Post = require("../models/post");
const Comment = require("../models/comment");
exports.createPost = async (req, res, next) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
      comments: []
    });
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
    }
    await Comment.deleteMany({ post: req.params.id });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};
