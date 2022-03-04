const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      max: 500,
    },
    img: { type: String },
    comments: { type: Array, default: [{ id: Number, content: String }] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
