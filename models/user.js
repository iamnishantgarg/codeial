const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("User", userSchema);
