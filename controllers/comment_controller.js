const Comment = require("../models/comment");
const Post = require("../models/post");
exports.create = (req, res, next) => {
  Post.findById(req.body.post, (err, post) => {
    if (err) {
      console.log(err);
      return;
    }
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        },
        (err, comment) => {
          if (comment) {
            post.comments.push(comment);
            post.save();
            return res.redirect("/");
          }
        }
      );
    } else {
      return res.redirect("/");
    }
  });
};
