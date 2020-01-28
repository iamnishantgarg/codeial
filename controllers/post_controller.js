const Post = require("../models/post");
const Comment = require("../models/comment");
exports.createPost = (req, res, next) => {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
      comments: []
    },
    (err, post) => {
      if (err) {
        console.log("error in creating post: " + err);
        return;
      }
      return res.redirect("back");
    }
  );
};

exports.destroy = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, err => {
        if (err) return res.redirect("back");
      });
      return res.redirect("/");
    } else {
      return res.redirect("back");
    }
  });
};
