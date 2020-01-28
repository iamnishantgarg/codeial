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

// exports.destroy = (req, res, next) => {
//   Comment.findById(req.params.in, (err, comment) => {
//     if (comment.user == req.user.id) {
//       let postId = comment.post;
//       comment.remove();
//       Post.findByIdAndUpdate(
//         postId,
//         { $pull: { comments: req.params.id } },
//         (err, post) => {
//           if (err) return res.redirect("back");
//           else return res.redirect("back");
//         }
//       );
//     }
//   });
// };
