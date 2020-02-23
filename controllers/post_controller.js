const Post = require("../models/post");
const Comment = require("../models/comment");
exports.createPost = async (req, res, next) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
      comments: []
    });
    let p = await Post.findById(post).populate("user");
    // console.log(p);

    if (req.xhr) {
      // console.log("yes ajax");

      return res.status(200).json({
        data: {
          p
        },
        message: "post created"
      });
    }
    req.flash("success", "post created successfully!");
    return res.redirect("back");

    // console.log(p);

    // console.log(post);

    // console.log(post);
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

    if (req.xhr) {
      // console.log("xhr reached");
      return res.status(200).json({
        data: {
          post_id: req.params.id
        },
        message: "post deleted"
      });
    }
    req.flash("success", "post and associated comments deleted successfully!");
    return res.redirect("/");
  } catch (error) {
    req.flash("error", "cannot delete post!");

    console.log(error);
    return res.redirect("back");
  }
};
