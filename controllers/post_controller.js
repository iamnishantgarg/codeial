const Post = require("../models/post");
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
